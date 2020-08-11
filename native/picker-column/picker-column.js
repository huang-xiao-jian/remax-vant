// tools
function range(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

Component({
  properties: {
    itemHeight: {
      type: Number,
    },
    visibleItemCount: {
      type: Number,
    },
    options: {
      type: Array,
    },
    value: {
      type: String,
    },
  },
  data: {
    baseline: 0,
    offset: 0,
    duration: 200,
    startY: 0,
    startOffset: 0,
  },
  observers: {
    value(_value) {
      const { options, itemHeight } = this.data;
      const currentIndex =
        options.findIndex((option) => option.value === _value) || 0;

      this.setData({
        offset: -1 * currentIndex * itemHeight,
      });
    },
  },
  lifetimes: {
    attached() {
      const { itemHeight, visibleItemCount } = this.data;

      this.setData({
        baseline: (itemHeight * (visibleItemCount - 1)) / 2,
      });
    },
  },

  methods: {
    onTap(event) {
      this.triggerEvent('change', {
        value: event.target.dataset.value,
      });
    },

    onTouchStart(event) {
      const { offset } = this.data;

      this.setData({
        startY: event.touches[0].clientY,
        startOffset: offset,
        duration: 0,
      });
    },

    onTouchMove(event) {
      const { startY, startOffset, itemHeight, options } = this.data;

      const deltaY = event.touches[0].clientY - startY;
      const minimum = -1 * itemHeight * options.length;

      this.setData({
        offset: range(startOffset + deltaY, minimum, itemHeight),
      });
    },

    onTouchEnd() {
      const { options, itemHeight, offset, value } = this.data;

      this.setData({
        duration: 200,
      });

      const index = range(
        Math.round(-offset / itemHeight),
        0,
        options.length - 1
      );
      const next = options[index].value;

      if (value !== next) {
        this.triggerEvent('change', {
          value: next,
        });
      } else {
        // value 值不变，observer 不触发，remax 与小程序交互问题
        this.setData({
          value: next,
        });
      }
    },
  },
});
