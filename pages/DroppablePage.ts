import { type Locator, type Page } from "@playwright/test";

export class DroppablePage {
  private readonly page: Page;
  readonly draggable: Locator;
  readonly dropTarget: Locator;

  constructor(page: Page) {
    this.page = page;
    this.draggable = page.locator("#draggable");
    this.dropTarget = page.locator("#simpleDropContainer #droppable");
  }

  async goto(): Promise<void> {
    await this.page.goto("/droppable");
    await this.page.waitForFunction(() => {
      const element = document.querySelector("#draggable");
      return element?.classList.contains("ui-draggable") === true;
    });
  }

  async drop(): Promise<void> {
    const source = await this.draggable.boundingBox();
    const target = await this.dropTarget.boundingBox();

    if (!source || !target) {
      throw new Error("Draggable element or drop target is not visible");
    }

    await this.page.mouse.move(
      source.x + source.width / 2,
      source.y + source.height / 2,
    );
    await this.page.mouse.down();
    await this.page.mouse.move(
      target.x + target.width / 2,
      target.y + target.height / 2,
      { steps: 15 },
    );
    await this.page.mouse.up();
  }
}
