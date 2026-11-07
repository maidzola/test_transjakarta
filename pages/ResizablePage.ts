import { type Locator, type Page } from "@playwright/test";

export class ResizablePage {
  private readonly page: Page;
  private readonly resizableBox: Locator;
  private readonly resizeHandle: Locator;

  constructor(page: Page) {
    this.page = page;
    this.resizableBox = page.locator("#resizableBoxWithRestriction");
    this.resizeHandle = this.resizableBox.locator(".react-resizable-handle");
  }

  async goto(): Promise<void> {
    await this.page.goto("/resizable");
  }

  async resizeTo(width: number, height: number): Promise<void> {
    const box = await this.resizableBox.boundingBox();
    const handle = await this.resizeHandle.boundingBox();

    if (!box || !handle) {
      throw new Error("Resizable box or its handle is not visible");
    }

    const startX = handle.x + handle.width / 2;
    const startY = handle.y + handle.height / 2;
    const heightDelta = height - box.height;
    await this.page.mouse.move(startX, startY);
    await this.page.mouse.down();
    await this.page.mouse.move(
      startX + width - box.width,
      startY + (heightDelta === 0 ? 1 : heightDelta),
      { steps: 10 },
    );
    await this.page.mouse.up();

    if (heightDelta === 0) {
      const resizedBox = await this.resizableBox.boundingBox();
      const resizedHandle = await this.resizeHandle.boundingBox();

      if (!resizedBox || !resizedHandle) {
        throw new Error("Resizable box or its handle is not visible");
      }

      const resizedStartX = resizedHandle.x + resizedHandle.width / 2;
      const resizedStartY = resizedHandle.y + resizedHandle.height / 2;
      await this.page.mouse.move(resizedStartX, resizedStartY);
      await this.page.mouse.down();
      await this.page.mouse.move(
        resizedStartX + width - resizedBox.width,
        resizedStartY + height - resizedBox.height,
        { steps: 5 },
      );
      await this.page.mouse.up();
    }
  }

  async dimensions(): Promise<{ width: number; height: number }> {
    return this.resizableBox.evaluate((element) => {
      const { width, height } = element.getBoundingClientRect();
      return { width, height };
    });
  }
}
