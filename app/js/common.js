$(function () {
  const scene = document.getElementById("scene");
  const parallaxInstance = new Parallax(scene, {
    relativeInput: true,
    clipRelativeInput: true,
    hoverOnly: true,
    scalarY: 3,
    scalarX: 3,
  });

  const baseUrl = "img/home";
  function templateResult(state) {
    if (!state.id) {
      return state.text;
    }
    const $state = $(
      `<span><img src="${baseUrl}/${state.element.value.toLowerCase()}.png" class="img-flag" /></span>`
    );
    return $state;
  }

  function templateSelection(option) {
    $(".select2-selection__rendered").addClass(option.id);
  }

  $("select").select2({
    templateResult,
    templateSelection,
    minimumResultsForSearch: -1,
  });

  $(".menu-item-has-children").on("click", function () {
    $(this)
      .toggleClass("active")
      .siblings(".menu-item-has-children")
      .removeClass("active");
  });

  $(document).mouseup(function (e) {
    // событие клика по веб-документу
    var div = $(".menu-item-has-children"); // тут указываем ID элемента
    if (!div.is(e.target) && div.has(e.target).length === 0) {
      // и не по его дочерним элементам
      $(div).removeClass("active");
    }
  });

  /* class Custom extends window.Chart.LineController {
    draw() {
      super.draw(arguments);

      const ctx = this.chart.ctx;

      let _stroke = ctx.stroke;
      ctx.stroke = function() {
        ctx.save();
        ctx.shadowColor = 'rgba(0,0,0, 0.3)';
        ctx.shadowBlur = 10;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 5;
        _stroke.apply(this, arguments);
        ctx.restore();
      }
    }
  }

  Custom.id = 'shadowLine';
  Custom.defaults = window.Chart.LineController.defaults;

  window.Chart.register(Custom) */

  const colors = {
    first: {
      hex: "#3CA1FF",
      rgba: "rgba(60,161,255, 0.3)",
    },
    second: {
      hex: "#FFB9B9",
      rgba: "rgba(255,185,185, 0.3)",
    },
    third: {
      hex: "#EFEB89",
      rgba: "rgba(255,192,117, 0.3)",
    },
    fours: {
      hex: "#FFC075",
      rgba: "rgba(239,235,137, 0.3)",
    },
    fifth: {
      hex: "#A6BAFF",
      rgba: "rgba(249,129,237, 0.3)",
    },
    six: {
      hex: "#F981ED",
      rgba: "rgba(166,186,255, 0.3)",
    },
  };

  const ctx = document.getElementById("myChart").getContext("2d");
  const myChart = new Chart(ctx, {
    type: "line",
    data: {
      labels: [
        "2017",
        "2018",
        "2019",
        "2020",
        "2021",
        "half year",
        "month",
        "week",
      ],
      datasets: [
        {
          indicator: "first",
          label: "",
          data: [0, 170, 300, 250, 160, 180, 155, 220, 340],
          borderColor: colors.first.hex,
          borderWidth: 3,
          pointRadius: 0,
          z: 1,
        },
        {
          indicator: "second",
          label: "",
          data: [500, 420, 400, 240, 250, 240, 430, 160],
          borderColor: [colors.second.rgba],
          borderWidth: 3,
          pointRadius: 0,
          z: 0,
        },
        {
          indicator: "third",
          label: "",
          data: [250, 400, 620, 430, 450, 470, 600, 660],
          borderColor: [colors.third.rgba],
          borderWidth: 3,
          pointRadius: 0,
          z: 0,
        },
        {
          indicator: "fours",
          label: "",
          data: [810, 800, 700, 720, 700, 800, 700, 620],
          borderColor: [colors.fours.rgba],
          borderWidth: 3,
          pointRadius: 0,
          z: 0,
        },
        {
          indicator: "fifth",
          label: "",
          data: [900, 950, 1000, 1070, 1250, 1180, 1050, 1230],
          borderColor: [colors.fifth.rgba],
          borderWidth: 3,
          pointRadius: 0,
          z: 0,
        },
        {
          indicator: "six",
          label: "",
          data: [1120, 1050, 900, 980, 1050, 1100, 950, 760],
          borderColor: [colors.six.rgba],
          borderWidth: 3,
          pointRadius: 0,
          z: 0,
        },
      ],
    },
    options: {
      defaultFontColor: "rgba(255,255,255, 0.5)",
      responsive: true,
      scales: {
        x: {
          display: true,
          borderWidth: 0,
          ticks: {
            beginAtZero: true,
            color: "rgba(255,255,255, 0.5)",
            font: {
              size: 13,
            },
          },
          grid: {
            color: "transparent",
            borderWidth: 0,
          },
        },
        y: {
          beginAtZero: true,
          suggestedMin: 0,
          suggestedMax: 1400,
          borderWidth: 3,
          ticks: {
            beginAtZero: true,
            color: "rgba(255,255,255, 0.5)",
            font: {
              size: 14,
              weight: 600,
            },
          },
          grid: {
            color: "rgba(255,255,255, 0.1)",
            borderWidth: 0,
            lineWidth: 3,
          },
        },
      },
      plugins: {
        tooltip: {
          usePointStyle: false,
          display: false,
        },
        legend: false,
      },
      elements: {
        line: {
          fill: false,
          tension: 0,
          backgroundColor: "#fff",
          borderColor: "red",
        },
        point: {
          enabled: false,
        },
      },
    },
  });

  $(".chart__control").on("click", function (e) {
    e.preventDefault();
    const id = $(this).data("id");
    const value = $(this).data("value");

    $(this)
      .toggleClass("active")
      .siblings(".chart__control")
      .removeClass("active");

    myChart.data.datasets[id].borderColor = colors[value].hex;
    myChart.data.datasets[id].z = 1;

    myChart.data.datasets.forEach((item, index) => {
      if (index !== id) {
        item.borderColor = colors[item.indicator].rgba;
        item.z = 0;
      }
    });
    myChart.update();
  });

  function startCounter() {
    $(".counter").each(function (index) {
      $(this)
        .prop("Counter", 0)
        .animate(
          {
            Counter: parseFloat($(this).text()),
          },
          {
            duration: 4000,
            easing: "swing",
            step: function (now) {
              $(this).text(Math.round(now * 10) / 10);
            },
          }
        );
    });
  }

  startCounter();
});
