function getPrice(parentBlock) {
  payTable = parentBlock.find(".table");
  tableRow = payTable.find(".table_row");  
  price = 0;
  tableRow.each(function() {
    filterCheckbox = $(this).find(".ch_childrens input");
    if(filterCheckbox.is(":checked")) {
      radio = $(this).find(".radio input");
      radio.each(function() {
        if( $(this).is(":checked") ) {
          radioVal = parseInt($(this).val());
          console.log(radioVal);
          price += radioVal;
        }
      });
    } else {
      console.log(0);
    }
  });
  parentBlock.find(".priceVal").text(price);
}

function getIconsPostion() {
  if($("#big_chart").length > 0 ) {
    $(".big_chart_icons img").each(function() {
        iconIndex = $(this).index();
        icon = $(this);
        iconWidth = $(this).width() / 2;
        $("#big_chart svg .ct-labels foreignObject").each(function() {
          foreignObjectIndex = $(this).index();
          foreignObjectWidth = $(this).width() / 2;
          if(iconIndex == foreignObjectIndex) {
            offsetTop = $(this).offset().top + 15;
            offsetleft = $(this).offset().left + foreignObjectWidth - iconWidth;
            icon.offset({"left" : offsetleft, "top" : offsetTop});
          }
        });
      });
  }
}

function getBarsWidth() {
  if($("#chart_9").length > 0 ) {
    ctHorizontalLeftCoord1 = $("#chart_9 .ct-grid.ct-horizontal:eq(2)").offset().left;
    ctHorizontalLeftCoord2 = $("#chart_9 .ct-grid.ct-horizontal:eq(1)").offset().left;
    barWidth = parseInt( ctHorizontalLeftCoord1 - ctHorizontalLeftCoord2 - 1 );
  }
}

function getRespParams() {
  if($(".header_site").offset().top > 2) {
    $(".header_site").addClass("resp_bg");
  } else {
    $(".header_site").removeClass("resp_bg");
  }
}

function getLocPosition() {
  if($(".locRow").width() > $(".location_wrapp").width()) {
    $(".location_wrapp").addClass("rewAlign");
  } else {
    $(".location_wrapp").removeClass("rewAlign");
  }
}

var w = window,
d = document,
e = d.documentElement,
g = d.getElementsByTagName('body')[0],
bodyWidth = w.innerWidth || e.clientWidth || g.clientWidth;


var barWidth;

$(window).load(function() {
  getLocPosition();
});

$(window).resize(function() {
  bodyWidth = w.innerWidth || e.clientWidth || g.clientWidth;
  getIconsPostion();
  getBarsWidth();
  getRespParams();
  getLocPosition();
  $("#chart_9 .ct-bar").attr('style', 'stroke-width: '+barWidth+'px !important');
});

$(document).scroll(function() {
  getRespParams();
});

$(document).ready(function() {
    getRespParams();    

    $(".dropdown_title").on("click", function(e) {
      e.preventDefault();
      parent = $(this).closest(".dropdown_box");
      if(parent.hasClass("active")) {
        parent.removeClass("active");
      } else {
        $(".dropdown_box").removeClass("active");
        parent.addClass("active");
      }
    });

    $(".val").on("click", function(e) {
      e.preventDefault();
      parent = $(this).closest(".dropdown_box");
      activeVal = parent.find(".active_val");
      parent.find(".hide_val").val($(this).html());
      activeVal.html($(this).html());
      parent.removeClass("active");
    });

    $(this).keydown(function(eventObject){
      if (eventObject.which == 27) {
        $(".dropdown_box").removeClass("active");
      }
    });

    $(document).on("mouseup", function(e) {
        e.preventDefault();
        hide_element = $(".dropdown_box");
        if (!hide_element.is(e.target)
            && hide_element.has(e.target).length === 0
            && hide_element.hasClass("active")) {
          hide_element.removeClass("active")
        }
    });

    // -----------

    if($(".chart_1").length > 0) {
      new Chartist.Line('.chart_1', {
        labels: [4, 5, 6, 7, 8],
        series: [
          [0, 1, 0, 1, 0]
          ]
        }, {
          fullWidth: true,
          chartPadding: {
            right: 40,
            left: -15
          },
          axisX: {
            labelInterpolationFnc: function(value, index) {
              return value + " sep";
            }
          },
          height: '80px'
      });
    }

    // ------------

    $(".ch_childrens input").on("change", function() {
      parentBlock = $(this).closest(".checkboxes_array");
      chChildrens = parentBlock.find(".ch_childrens input");
      mainCheckbox = parentBlock.find(".main_checkbox input");
      chChildrens.each(function() {
        if (!$(this).is(":checked")) {
          mainCheckbox.prop("checked", false);
          return false;
        } else {
          mainCheckbox.prop("checked", true);
        }
      });
      getPrice(parentBlock);
    });

    $(".main_checkbox input").on("change", function() {
      parentBlock = $(this).closest(".checkboxes_array");
      chChildrens = parentBlock.find(".ch_childrens input");
      if (!$(this).is(":checked")) {
        chChildrens.prop("checked", false);
      } else {
        chChildrens.prop("checked", true);
      }
    });

    // ------------

    $('.info_table').on('mouseover', '.cell', function() {
      index = $(this).index();
      parentTable = $(this).closest(".info_table");
      tableRow = parentTable.find(".table_row");
      tableRow.find(".cell").removeClass("bg");
      tableRow.find(".cell:eq("+index+")").addClass("bg");
    });

    $('.info_table').on('mouseleave', '.cell', function() {
      parentTable.find(".cell").removeClass("bg");
    });

    // ------------

    $(".show_pass").on("click", function(e) {
      e.preventDefault();
      parentBlock = $(this).closest(".input_wrapp");
      parentBlock.toggleClass("show_password");
    });

    $(".pass_back").on("keyup", function(e) {
      e.preventDefault();
      parentBlock = $(this).closest(".input_wrapp");
      passFront = parentBlock.find(".pass_front");
      passFront.val($(this).val());
    });

    $(".pass_front").on("keyup", function(e) {
      e.preventDefault();
      parentBlock = $(this).closest(".input_wrapp");
      passBack = parentBlock.find(".pass_back");
      passBack.val($(this).val());
    });

    // ------------

    if($("#chart_2").length> 0) {
      new Chartist.Line('#chart_2', {
          labels: [1, 2, 3, 4, 5, 6, 7, 8],
          series: [
            [5, 9, 7, 8, 5, 3, 5, 4]
          ]
        }, {
          low: 0,
          showArea: true,
          height: '55px',
          showLine: true,
          showPoint: false,
          fullWidth: true,
          showLabel: false,
          axisX: {
            showGrid: false,
            showLabel: false,
            offset: 0
          },
          axisY: {
            showGrid: false,
            showLabel: false,
            offset: 0
          }
        });
      }

    if($("#chart_3").length> 0) {
      new Chartist.Line('#chart_3', {
          labels: [1, 2, 3, 4, 5, 6, 7, 8],
          series: [
            [5, 9, 7, 8, 5, 3, 5, 4]
          ]
        }, {
          low: 0,
          showArea: true,
          height: '55px',
          showLine: true,
          showPoint: false,
          fullWidth: true,
          showLabel: false,
          axisX: {
            showGrid: false,
            showLabel: false,
            offset: 0
          },
          axisY: {
            showGrid: false,
            showLabel: false,
            offset: 0
          }
        });
      }

    if($("#chart_4").length> 0) {
      new Chartist.Line('#chart_4', {
          labels: [1, 2, 3, 4, 5, 6, 7, 8],
          series: [
            [5, 9, 7, 8, 5, 3, 5, 4]
          ]
        }, {
          low: 0,
          showArea: true,
          height: '55px',
          showLine: true,
          showPoint: false,
          fullWidth: true,
          showLabel: false,
          axisX: {
            showGrid: false,
            showLabel: false,
            offset: 0
          },
          axisY: {
            showGrid: false,
            showLabel: false,
            offset: 0
          }
        });
      }

      if($(".pie").length > 0) {
        window.addEventListener('DOMContentLoaded', () => {
          const circle = new CircularProgressBar('pie');
        });
      }

      if($("#chart_5").length> 0) {
        new Chartist.Line('#chart_5', {
            labels: [1, 2, 3, 4, 5, 6, 7, 8],
            series: [
              [5, 9, 7, 8, 5, 3, 5, 4]
            ]
          }, {
            low: 0,
            showArea: false,
            height: '35px',
            showLine: true,
            fullWidth: true,
            showLabel: false,
            axisX: {
              showGrid: false,
              showLabel: false,
              offset: 0
            },
            axisY: {
              showGrid: false,
              showLabel: false,
              offset: 0
            }
          });
      }

      if($("#chart_6").length> 0) {
        new Chartist.Line('#chart_6', {
            labels: [1, 2, 3, 4, 5, 6, 7, 8],
            series: [
              [5, 9, 7, 8, 5, 3, 5, 4]
            ]
          }, {
            low: 0,
            showArea: false,
            height: '35px',
            showLine: true,
            fullWidth: true,
            showLabel: false,
            axisX: {
              showGrid: false,
              showLabel: false,
              offset: 0
            },
            axisY: {
              showGrid: false,
              showLabel: false,
              offset: 0
            }
          });
      }

      if($("#chart_7").length> 0) {
        new Chartist.Line('#chart_7', {
            labels: [1, 2, 3, 4, 5, 6, 7, 8],
            series: [
              [5, 9, 7, 8, 5, 3, 5, 4]
            ]
          }, {
            low: 0,
            showArea: false,
            height: '35px',
            showLine: true,
            fullWidth: true,
            showLabel: false,
            axisX: {
              showGrid: false,
              showLabel: false,
              offset: 0
            },
            axisY: {
              showGrid: false,
              showLabel: false,
              offset: 0
            }
          });
      }

      if($("#chart_8").length> 0) {
        new Chartist.Line('#chart_8', {
            labels: [1, 2, 3, 4, 5, 6, 7, 8],
            series: [
              [5, 9, 7, 8, 5, 3, 5, 4]
            ]
          }, {
            low: 0,
            showArea: false,
            height: '35px',
            showLine: true,
            fullWidth: true,
            showLabel: false,
            axisX: {
              showGrid: false,
              showLabel: false,
              offset: 0
            },
            axisY: {
              showGrid: false,
              showLabel: false,
              offset: 0
            }
          });
      }

      // --------------

      if($("#pie_chart").length > 0) {
        new Chartist.Pie('#pie_chart', {
          series: [20, 10]
        }, {
          donut: true,
          donutWidth: 2,
          startAngle: 270,
          total: 60,
          showLabel: false
        });
      }

      // --------------

      if($("#chart_9").length > 0) {
        new Chartist.Bar('#chart_9', {
          labels: [0, 2, 4, 6, 8, 10],
          series: [
            [0, 0, 2, 2, 10, 0, 0],
            [6, 6, 6, 6, 6, 6, 6],
            [3, 3, 3, 3, 3, 3, 3]
            ]
          }, {
            fullWidth: true,
            chartPadding: {
              right: 0,
              left: 0
            },
            axisX: {
              labelInterpolationFnc: function(value, index) {
                return "Sep " + value;
              }
            },
            height: '250px',
            stackBars: true,
        }).on('created', function(data) {
          getBarsWidth();
          $("#chart_9 .ct-bar").attr('style', 'stroke-width: '+barWidth+'px !important');
        });
      }

      // ------------

      if($("#big_chart").length > 0) {

        new Chartist.Bar('#big_chart', {
          labels: ['icon1', 'icon2', 'icon3', 'icon4', 'icon5', 'icon6', 'icon7', 'icon8', 'icon9', 'icon10', 'icon11', 'icon12', 'icon13', 'icon14', 'icon15', 'icon16'],
          series: [
            [1, 10, 2, 4, 1, 10, 2, 4, 1, 10, 2, 4, 1, 10, 2, 4],
            [0, 8, 4, 3, 9, 3, 5, 1, 10, 1, 4, 5, 2, 3, 5, 7],
            [10, 3, 4, 6, 3, 7, 8, 9, 10, 4, 5, 6, 3, 5, 6, 10],
          ]
        }, {
          stackBars: true,
          height: '210px'
        }).on('draw', function(data) {
          if(data.type === 'bar') {
            data.element.attr({
              style: 'stroke-width: 40px'
            });
          }
        }).on('created', function() {
          getIconsPostion();
        });
      }

      // ----------

    $(document).on("click", "[data-popup-link]",  function(e) {
      e.preventDefault();
      popupName = $(this).attr("data-popup-link");
      div = document.createElement('div');
      div.style.overflowY = 'scroll';
      div.style.width = '50px';
      div.style.height = '50px';
      div.style.visibility = 'hidden';
      document.body.appendChild(div);
      scrollWidth = div.offsetWidth - div.clientWidth;
      document.body.removeChild(div);
      $("body").addClass("fixed");
      $("body").css({
          "position" : "fixed",
          "top" :  -$(document).scrollTop() + "px",
          "overflow" : "hidden",
          "right" : 0,
          "left" : 0,
          "bottom" : 0,
          "padding-right" : scrollWidth + "px"
      });
      $(".popup_bg").fadeIn(300);
      $("[data-popup = '"+ popupName +"']").fadeIn(300);
    });
    $(document).on("click", ".close_popup, .popup_bg", function(e) {
      e.preventDefault();
      curTop = $("body").css("top");
      curTop = Math.abs(parseInt(curTop, 10));
      $("body").attr("style", "");
      if (curTop !== 0) {
          $("html").scrollTop(curTop);
      }
      $("body").removeClass("fixed");
      $(".popup_bg").fadeOut(300);
      $("[data-popup]").fadeOut(300);
    });
    $(this).keydown(function(eventObject){
      if (eventObject.which == 27 && $("body").hasClass("fixed")) {
        curTop = $("body").css("top");
        curTop = Math.abs(parseInt(curTop, 10));
        $("body").attr("style", "");
        if (curTop !== 0) {
            $("html").scrollTop(curTop);
        }
        $("body").removeClass("fixed");
        $(".popup_bg").fadeOut(300);
        $("[data-popup]").fadeOut(300);
      }
    });
    $(document).on("mouseup", function(e) {
      if($(".popup").is(":visible")) {
        e.preventDefault();
        hide_element = $(".popup_content");
        if (!hide_element.is(e.target)
            && hide_element.has(e.target).length === 0) {
            curTop = $("body").css("top");
            curTop = Math.abs(parseInt(curTop, 10));
            $("body").attr("style", "");
            if (curTop !== 0) {
                $("html").scrollTop(curTop);
            }
            $("body").removeClass("fixed");
            $(".popup_bg").fadeOut(300);
            $("[data-popup]").fadeOut(300);
        }
      }
    });

    // -------------

    $(".del_btn_2, .del_btn_3").on("click", function(e) {
      parentBlock = $(this).closest(".domain_tooltip");
      parentBlock.remove();
    });

    // -------------

    $(".respmenubtn").click(function(e) {
      e.preventDefault();
      if( $("#resp_nav").is(":hidden") ) {
          $("#resp_nav").fadeIn(300);
          $(this).addClass("active");
      } else {
          $("#resp_nav").fadeOut(300);
          $(this).removeClass("active");
      }
    });

    $(".close_nav").click(function(e) {
      e.preventDefault();
      $("#resp_nav").fadeOut(300);
    });
    
    $(this).keydown(function(eventObject){
        if (eventObject.which == 27 &&
            $("#resp_nav").is(":visible") &&
            bodyWidth <= 767) {
                $("#resp_nav").fadeOut(300);
                $(".respmenubtn").removeClass("active");
        }
    });

    // --------

    $(".cansel_btn").on("click", function(e) {
      e.preventDefault();
      parent = $(this).closest("form");
      parent.find("input").prop("checked", false);
    });

    // ---------

    if($("#datepickerRange").length > 0) {
      new AirDatepicker('#datepickerRange', {
          range: true,
          multipleDatesSeparator: ' - ',
          position: 'bottom right',
          inline: true,
          onSelect: function(date) {
            var str = $("#datepickerRange").val();
            var result = str.replace(/[\.\/]/g,'-');
            $("#datepickerRange").val(result);
            $("#p_date").text(result);
          }
      });
    }

    // ---------

    $(".icons_list li").on("mouseover", function() {
      tooltip = $(this).children(".icon_tooltip, .tooltip");
      h = tooltip.height();
      parent = $(this).closest(".table_10");
      parentBottomCoord = parent.offset().top + parent.height();
      tooltipBottomCoord = tooltip.offset().top + tooltip.height();
      if(tooltipBottomCoord > parentBottomCoord) {
        tooltip.addClass("topPosition");
      }
    });

    $(".icons_list li").on("mouseleave", function() {
      tooltip = $(this).children(".icon_tooltip, .tooltip");
      tooltip.removeClass("topPosition");
    });
});