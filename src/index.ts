type ScrollerOptions = {
  duration: number;
  disableMask?: boolean;
  direction?: "left" | "right";
};
class InfiniteHorzScroll {
  scroller: HTMLElement;
  duration: number;
  children: Element[] = [];
  currentX: number;
  startingX: number;
  standard: number;
  firstAnimation: boolean;
  prependedItem: Element | null = null;
  options?: ScrollerOptions;
  constructor(
    scroller: HTMLElement,
    options: ScrollerOptions = { duration: 20 }
  ) {
    this.scroller = scroller;
    this.options = options;
    this.duration = options.duration;
    this.standard = 500;
    if (
      this.scroller &&
      this.scroller.children &&
      this.scroller.children.length > 0
    ) {
      this.children = Array.from(this.scroller.children);
      this.prependedItem = this.children[this.children.length - 1];
    } else {
      console.error("Scroller or its children do not exist");
    }
    this.currentX = 0;
    this.startingX = 0;
    this.firstAnimation = false;
    this.init();
  }
  init() {
    if (this.scroller instanceof HTMLElement && this.scroller.nodeName) {
      this.children.forEach((child, i) => {
        if (child instanceof HTMLImageElement) {
          child.addEventListener("load", () => {
            this.applyWidths(child, i);
          });
        } else {
          this.applyWidths(child, i);
        }
      });

      this.prepareWrappers();
      requestAnimationFrame(() => this.scroll());
    } else {
      console.error(`${this.scroller} is not an HTMLElement`);
    }
  }
  prepareWrappers() {
    const wrapper = document.createElement("div");
    wrapper.style.overflow = "hidden";

    if (this.options && !this.options.disableMask === true) {
      wrapper.style.webkitMask =
        "linear-gradient(90deg, transparent, white 20%, white 80%, transparent)";
      wrapper.style.mask =
        "linear-gradient(90deg, transparent, white 20%, white 80%, transparent)";
    }

    wrapper.setAttribute("data-scroller-container", "");

    this.scroller.setAttribute("data-scroller-wrapper", "");
    this.scroller.style.flexWrap = "nowrap";
    this.scroller.style.display = "flex";
    this.scroller.style.position = "relative";

    if (
      this.options &&
      this.options.direction === "right" &&
      this.prependedItem
    ) {
      this.scroller.prepend(this.prependedItem);
    }

    if (this.scroller.parentNode) {
      this.scroller.parentNode.replaceChild(wrapper, this.scroller);
    }
    wrapper.appendChild(this.scroller);
  }
  applyWidths(el: Element, i: number) {
    if (!el.hasAttribute("data-scroller-total-width")) {
      let firstComputedStyle = window.getComputedStyle(el);
      let totalWidth =
        parseInt(firstComputedStyle.width) +
        parseInt(firstComputedStyle.marginLeft) +
        parseInt(firstComputedStyle.marginRight) +
        parseInt(firstComputedStyle.paddingLeft) +
        parseInt(firstComputedStyle.paddingRight);
      el.setAttribute("data-scroller-total-width", String(totalWidth));
      el.setAttribute("data-scroller-item-index", String(i));
      (el as HTMLElement).style.flexShrink = "0";
    }
  }

  scroll() {
    const item = this.getItemBasedOnDirection();
    const itemWidth = this.getItemWidth(item);
    const adjustedDuration = this.getAdjustedDuration(itemWidth);

    this.currentX = this.getDirection(itemWidth);
    let _startingX = this.setStartingX();

    // Apply the initial translation
    this.scroller.style.transition = "";
    this.scroller.style.transform = `translateX(${_startingX}px)`;
    this.scroller.setAttribute("data-startingx", `${_startingX}`);

    // Use setTimeout to delay the start of the animation until after the initial translation has been rendered
    setTimeout(() => {
      // Start the animation
      this.scroller.style.transition = `transform ${adjustedDuration}s linear`;
      this.scroller.style.transform = `translateX(${this.currentX}px)`;
      this.scroller.setAttribute("data-currentx", `${this.currentX}`);

      // Schedule the next animation
      setTimeout(
        () => window.requestAnimationFrame(() => this.animate(item)),
        adjustedDuration * 1000
      );
    }, 0);
  }

  setStartingX() {
    let _startingX = this.startingX;
    if (
      this.options &&
      this.options.direction === "right" &&
      this.prependedItem
    ) {
      const prependedItemWidth = this.getItemWidth(this.prependedItem);
      _startingX = -prependedItemWidth;
      this.currentX = 0;
    } else {
      this.startingX = 0;
      _startingX = this.startingX;
    }

    return _startingX;
  }
  getItemBasedOnDirection() {
    if (
      this.options &&
      this.options.direction === "right" &&
      this.prependedItem
    ) {
      return this.prependedItem;
    } else {
      return this.children[0];
    }
  }
  getAdjustedDuration(itemWidth: number) {
    const ratio = itemWidth / this.standard;
    const adjustedDuration = this.duration * ratio;
    return adjustedDuration;
  }
  getItemWidth(item: Element) {
    return Number(item.getAttribute("data-scroller-total-width"));
  }
  getDirection(width: number) {
    return this.options && this.options.direction === "right" ? width : -width;
  }

  animate(item: Element) {
    if (this.options && this.options.direction === "right") {
      this.scroller.prepend(item);
      this.prependedItem = this.children[this.children.length - 1];
    } else {
      this.scroller.appendChild(item);
    }
    const removedElement = this.children.shift();
    if (removedElement) {
      this.children.push(removedElement);
      this.scroller.style.transition = "";
      this.scroller.style.transform = `translateX(${0}px)`;
      window.requestAnimationFrame(() => this.scroll());
    } else {
      console.error("Element not found");
    }
  }
  public destroy() {
    // Remove styles and attributes added to the scroller
    this.scroller.style.flexWrap = "";
    this.scroller.style.display = "";
    this.scroller.style.position = "";
    this.scroller.style.transition = "";
    this.scroller.style.transform = "";
    this.scroller.removeAttribute("data-scroller-wrapper");
    this.scroller.removeAttribute("data-startingx");
    this.scroller.removeAttribute("data-currentx");

    // Remove the wrapper and put the scroller back in its original place
    const wrapper = this.scroller.parentNode;
    if (wrapper && wrapper.parentNode && wrapper instanceof HTMLElement) {
      wrapper.parentNode.replaceChild(this.scroller, wrapper);
    }

    // Remove styles and attributes from the children
    this.children.forEach((el) => {
      el.removeAttribute("data-scroller-total-width");
      el.removeAttribute("data-scroller-item-index");
      (el as HTMLElement).style.flexShrink = "";
    });

    // Reset class properties
    this.children = [];
    this.currentX = 0;
    this.startingX = 0;
    this.firstAnimation = false;
    this.prependedItem = null;
  }
}

export default InfiniteHorzScroll;
