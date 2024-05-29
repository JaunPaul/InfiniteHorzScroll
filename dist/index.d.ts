type ScrollerOptions = {
    duration: number;
    disableMask?: boolean;
    direction?: "left" | "right";
};
declare class InfiniteScroll {
    scroller: HTMLElement;
    duration: number;
    children: Element[];
    currentX: number;
    startingX: number;
    standard: number;
    firstAnimation: boolean;
    prependedItem: Element | null;
    options?: ScrollerOptions;
    constructor(scroller: HTMLElement, options?: ScrollerOptions);
    init(): void;
    prepareWrappers(): void;
    applyWidths(items: Element[]): void;
    scroll(): void;
    setStartingX(): number;
    getItemBasedOnDirection(): Element;
    getAdjustedDuration(itemWidth: number): number;
    getItemWidth(item: Element): number;
    getDirection(width: number): number;
    animate(item: Element): void;
}
export default InfiniteScroll;
