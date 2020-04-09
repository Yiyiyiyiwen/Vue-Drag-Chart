<!--  -->
<template>
  <div class="dragchartcontent" ref="dragcontnet">
    <vue-draggable-resizable
      :w="dragchartlist.widthlength"
      :h="dragchartlist.heightlength"
      :x="dragchartlist.x"
      :y="dragchartlist.y"
      @dragging="onDrag"
      @resizing="onResize"
      @dragstop="onDragstop"
      @resizestop="onResizstop"
      :parent="true"
      :active="false"
      :isConflictCheck="true"
      :snap="true"
      :snapTolerance="20"
      v-on:dragging="onDrag"
      v-on:resizing="onResize"
      class="dragitem mymeeting"
      style="border:0"
    >
      <div class="title">{{dragchartlist.title}}</div>
      <ve-line
        :data="dragchartlist.chartData"
        width="100%"
        height="100%"
        :judge-width="true"
        ref="mychart"
        v-if="dragchartlist.type==1"
      ></ve-line>
      <ve-ring
        :data="dragchartlist.chartData"
        width="100%"
        height="100%"
        :judge-width="true"
        ref="mychart"
        :settings="ringchartSettings"
        v-if="dragchartlist.type==2"
      ></ve-ring>
      <ve-pie
        :data="dragchartlist.chartData"
        width="100%"
        height="100%"
        :judge-width="true"
        ref="mychart"
        :settings="piechartSettings"
        v-if="dragchartlist.type==3"
      ></ve-pie>
      <ve-histogram
        :data="dragchartlist.chartData"
        width="100%"
        height="100%"
        :judge-width="true"
        ref="mychart"
        v-if="dragchartlist.type==4"
      ></ve-histogram>
      <ve-bar
        :data="dragchartlist.chartData"
        width="100%"
        height="100%"
        :judge-width="true"
        ref="mychart"
        v-if="dragchartlist.type==5"
      ></ve-bar>
    </vue-draggable-resizable>
  </div>
</template>

<script>
export default {
  props: ["list"],
  data() {
    return {
      dragchartlist: this.list,
      width: "",
      height: "",
      x: 0,
      y: 0,
      domheight: "",
      domwidth: "",
      piechartSettings: {},
      ringchartSettings: {},
      oldx: 0,
      oldy: 0
    };
  },
  created() {},
  watch: {
    width() {
      this.$refs.mychart.echarts.resize();
    },
    height() {
      this.$refs.mychart.echarts.resize();
    },
    domheight(newvalue) {
      this.chartresize();
    },
    domwidth(newvalue) {
      this.chartresize();
    },
    //通知父元素修改vuex
    dragchartlist: {
      //深度监听，可监听到对象、数组的变化
      handler(val, oldVal) {
        this.$emit("changelist");
        let length = this.dragchartlist.heightlength;
        this.piechartSettings = {
          offsetY: length / 2,
          radius: length / 3
        };
        this.ringchartSettings = {
          offsetY: length / 2,
          radius: [20, length / 3]
        };
      },
      deep: true
    },
    x(newvalue, oldvalue) {
      this.oldx = oldvalue;
    },
    y(newvalue, oldvalue) {
      this.oldy = oldvalue;
    }
  },
  components: {},

  computed: {},

  mounted() {
    let height = window.getComputedStyle(this.$refs.dragcontnet).height;
    this.domheight = height.slice(0, this.domwidth.indexOf("p") - 1);
    let width = window.getComputedStyle(this.$refs.dragcontnet).width;
    this.domwidth = width.slice(0, this.domwidth.indexOf("p") - 1);
    this.chartresize();
  },

  methods: {
    chartresize() {
      this.$set(
        this.dragchartlist,
        "widthlength",
        parseInt(this.domwidth * this.dragchartlist.width)
      );
      this.$set(
        this.dragchartlist,
        "heightlength",
        parseInt(this.domheight * this.dragchartlist.height)
      );

      this.piechartSettings = {
        offsetY: this.dragchartlist.heightlength / 2,
        radius: this.dragchartlist.heightlength / 3
      };
      this.$refs.mychart.echarts.resize();
    },
    onResize: function(x, y, width, height) {
      this.x = x;
      this.y = y;
      this.width = width;
      this.height = height;
    },
    onDrag: function(x, y) {
      this.x = x;
      this.y = y;
    },
    onDragstop() {
      if (!(this.x == this.oldx) && this.y == this.oldy) {
        this.$set(this.dragchartlist, "x", this.x);
        this.$set(this.dragchartlist, "y", this.y);
      }
    },
    onResizstop() {
      this.$set(this.dragchartlist, "x", this.x);
      this.$set(this.dragchartlist, "y", this.y);
      this.$set(this.dragchartlist, "widthlength", this.width);
      this.$set(this.dragchartlist, "heightlength", this.height);
      this.$set(
        this.dragchartlist,
        "width",
        (this.width / this.domwidth).toFixed(2)
      );
      this.$set(
        this.dragchartlist,
        "height",
        (this.height / this.domheight).toFixed(2)
      );
    }
  }
};
</script>
<style scoped lang="scss">
.dragchartcontent {
  width: 100%;
  height: 100%;
}
</style>