# InfiniteHorzScroll.js

InfiniteHorzScroll.js is a lightweight JavaScript library that transforms any list of elements into an infinite horizontal auto-scroll widget. It is easy to use and highly customizable, making it perfect for creating engaging and dynamic web experiences.

[Live demo](https://infinitehorzscroll.surge.sh/)

## Features
- Infinite auto-scroll for any list of elements.
- Customizable scroll duration.
- Optional scroll direction.
- Option to disable the mask effect.
- No need to duplicate content.
- Handles elements of varying widths seamlessly.
- Automatic placement and animation of elements using flexbox.

## Benefits
InfiniteHorzScroll.js offers several advantages over traditional scrolling solutions:

1. **No Duplicate Content:** Achieves horizontal scroll without needing to create duplicate content.
2. **Flexible Element Sizes:** Handles elements of varying sizes effortlessly.
3. **Efficient DOM Manipulation:** Elements are animated and re-ordered within the DOM, ensuring a smooth and endless rotation.
4. **Automatic Width Calculation:** Automatically calculates each element's computed width, eliminating the need to determine the parent container width.
5. **Easy Integration:** Simple setup with minimal configuration required.

## Installation

From a CDN as a module:

```html
    <script type="module">
      import InfiniteHorzScroll from "https://cdn.jsdelivr.net/npm/@kreonovo/infinitescroll@latest/dist/index.js";
    </script>
```

Alternatively, if you are using a package manager like npm, you can install it via:

```sh
npm i @kreonovo/infinitescroll
```

## Usage

To use InfiniteHorzScroll.js, follow these steps:

1. **Assign a Parent Element**

   Identify the parent element that contains the list of elements you want to scroll. For example:

   ```html
   <div id="imageWrapper">
     <img class="myImage" src="image1.jpg" alt="Image 1">
     <img class="myImage"src="image2.jpg" alt="Image 2">
     <img class="myImage" src="image3.jpg" alt="Image 3">
   </div>
   ```
    The parent element should not have gap css property otherwise the widget cannot calculate the computed width of each of the children elements here. If you need spacing between the elements. Give them right or left margins instead.

2. **Instantiate InfiniteHorzScroll**

   Create a constant to store the parent element and instantiate InfiniteHorzScroll with your desired options:

   ```javascript
   const imageWrapper = document.getElementById('imageWrapper');

   const options = {
     duration: 20, // duration in seconds which will determine the scrolling speed
     disableMask: false, // optional, defaults to false
     direction: 'left' // optional, defaults to 'left'
   };

   const scroller = new InfiniteHorzScroll(imageWrapper, options);
   ```

3. **Options Configuration**

   You can configure the behavior of InfiniteHorzScroll by passing an options object with the following properties:

   - `duration` (required): The duration of the scroll in seconds.
   - `disableMask` (optional): A boolean to disable the mask effect. Defaults to `false`.
   - `direction` (optional): The direction of the scroll. Can be `"left"` or `"right"`. Defaults to `"left"`.

### Example

Checkout InfiniteHorzScroll.js in action with this [live demo](https://infinitehorzscroll.surge.sh/)

## License

InfiniteHorzScroll.js is released under the MIT License. See the [LICENSE](LICENSE) file for more details.

## Contributing

We welcome contributions! Please read our [CONTRIBUTING](CONTRIBUTING.md) guidelines before submitting a pull request.

## Support

If you have any questions or need further assistance, feel free to open an issue on our [GitHub repository](https://github.com/JaunPaul/InfiniteHorzScroll.git).

---

Thank you for using InfiniteHorzScroll.js! We hope it enhances your web projects.