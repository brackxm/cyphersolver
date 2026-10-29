// loading /.

$(window).on("load", function () {
  if (document.getElementById("entdecken_container") != null) {
    document.getElementById("entdecken_container").style.visibility = "visible";
    document.getElementById("loading").style.display = "none";
  }

  if (document.getElementById("search_container") != null) {
    document.getElementById("search_container").style.visibility = "visible";
  }

  if (document.getElementById("phpsearch_container") != null) {
    document.getElementById("phpsearch_container").style.visibility = "visible";
    document.getElementById("loading").style.display = "none";
  }

  if (document.getElementById("detail_container") != null) {
    // document.getElementById('search_results_container').style.visibility = 'visible';
    document.getElementById("loading").style.display = "none";
  }

  var current_query = getCookie("current_query");
  var scroll_to = getCookie("scroll_to");
  var scroll_to_element = getCookie("scroll_to_element");

  var href = rootUrl + "search/" + current_query;
  $("#search_results_container").animate(
    {
      scrollTop: 0,
    },
    0
  );

  if (scroll_to_element !== "" && window.location.pathname.indexOf("/search") != -1) {
    if ($("#result_" + scroll_to_element).length > 0) {
      var element_po_before_scroll = $("#result_" + scroll_to_element).offset().top;
      var scroll_to_element_pos = element_po_before_scroll - $("#search_results_container").offset().top - 18;
      var result_position = scroll_to_element_pos - scroll_to;

      $("#search_results_container").scrollTop(scroll_to_element_pos);

      var scroll = setInterval(function () {
        var element_po_after_scroll = $("#result_" + scroll_to_element).offset().top;
        var how_much_to_scroll = $("#search_results_container").scrollTop() + element_po_after_scroll - $("#search_results_container").offset().top - 18;

        $("#search_results_container").scrollTop(how_much_to_scroll);
        if (how_much_to_scroll - $("#search_results_container").scrollTop() == 0) {
          clearInterval(scroll);
        }

        setTimeout(function () {
          clearInterval(scroll);
        }, 2000);
      }, 100);
    }
  }

  $(".tap_btn_link , .side_tap").click(function () {
    setCookie("current_query", "");
    setCookie("current_query2", "");
    setCookie("scroll_to", "");
    setCookie("scroll_to_element", "");
    setCookie("reset", "true");
  });
});

$(document).ready(function () {
  addListeners();
  set_entdecken();
  manage_favs();
});

// setting cookie
function setCookie(cname, cvalue) {
  // document.cookie = cname + "=" + cvalue + ";path=/;" + "HttpOnly;Secure;SameSite=Strict;";
  $.ajax({
    type: "POST",
    url: rootUrl + "Frontend/set_Cookie_from_js",
    data: {
      name: cname,
      value: cvalue,
    },
    success: function (data) {},
  });
}

// getting cookie
function getCookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(";");
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

var per_1 = random_num(30, 70);
var per_2 = random_num(30, 70);
$(document).scrollTop(1000);
var set_entdecken = (function fun() {
  if ($(window).width() >= 1200) {
    var l = 0;
    $(".highlight_block_container").each(function () {
      var item = $(this);

      switch (l % 3) {
        case 0:
          item.css("transform", "translate(0,-" + per_1 + "%)").addClass("case_0");
          break;
        case 2:
          item.css("transform", "translate(0,-" + per_2 + "%)").addClass("case_1");
          break;
        case 1:
          item.css("transform", "translate(0,0)").removeClass("case_1 case_0");
          break;
      }
      l++;
    });
  } else {
    $(".highlight_block_container").css("transform", "translate(0,0)");
  }

  return fun;
})();

function random_num(min, max) {
  return Math.floor(Math.random() * (max - min)) + min; // You can remove the Math.floor if you don't want it to be an integer
}

function manage_favs() {
  // initiate
  var favs = getCookie("favs");
  if (favs == "") {
    favs = [];
  } else {
    favs = JSON.parse(favs);
    for (var i = 0; i < favs.length; i++) {
      $(".box_flag[item_id='" + favs[i] + "']").addClass("active");
    }
  }

  $(".box_flag").click(function () {
    // initiate favs DB on the first fav added
    if (getCookie("favs") == "") {
      $.ajax({
        type: "POST",
        url: rootUrl + "Frontend/initiate_favs",
        data: "",
        success: function (data) {
          if (data) {
            setCookie("favs_id", JSON.stringify(data));
            /* console.log(data); */
          }
        },
      });
    }

    var item_id = $(this).attr("item_id");

    if (favs.indexOf(item_id) !== -1) {
      $(this).removeClass("active");
      var id_index = favs.indexOf(item_id);

      favs.splice(id_index, 1);
    } else {
      $(this).addClass("active");
      favs.push(item_id);
    }

    manage_favs_tap();

    $.ajax({
      type: "POST",
      url: rootUrl + "Frontend/update_favs",
      data: { favs_array: JSON.stringify(favs) },
      success: function (data) {
        if ((data = "ok")) {
          setCookie("favs", JSON.stringify(favs));
        } else {
          /* console.log(data); */
        }
      },
    });
  });

  // hide the favs tap if no favs added
  var manage_favs_tap = (function mft() {
    if (favs.length > 0) {
      /* $("#favs_tap_d").css("visibility", "visible");
      $("#favs_tap").parent().show(); */
    } else {
      /* $("#favs_tap_d").css("visibility", "hidden");
      $("#favs_tap").parent().hide(); */
    }
    return (manage_favs_tap = mft);
  })();
}

function addListeners() {
  // lazy load the result images
  lazy_load_start();

  var lazy_int = setInterval(function () {
    lazy_load_start();
  }, 100);

  setTimeout(function () {
    clearInterval(lazy_int);
  }, 10000);

  function lazy_load_start() {
    $(".lazy").Lazy({
      // your configuration goes here
      scrollDirection: "vertical",
      effect: "fadeIn",
      visibleOnly: true,
      threshold: 5000,
      appendScroll: $("#search_results_container"),
      onError: function (element) {},
    });
  }

  // apply desktop or mobile style
  if ($(window).width() >= 1200) {
    $("body").addClass("desktop");
  } else {
    $("body").removeClass("desktop");
  }

  // css vars

  // listen to the resize event
  window.addEventListener("resize", function () {
    // First get the viewport height and we multiple it by 1% to get a value for a vh unit
    var vh = window.innerHeight * 0.01;
    // Then  set the value in the --vh custom property to the root of the document
    document.documentElement.style.setProperty("--vh", vh + "px");

    if ($(window).width() < 1200 && !$("#swipe_up_inner").hasClass("open") && $("#floating_results_count").hasClass("active")) {
      $("#floating_results_count").removeClass("active");
      $("#floating_results_count").addClass("desk_active");
    }
    if ($(window).width() >= 1200 && $("#floating_results_count").hasClass("desk_active")) {
      $("#floating_results_count").removeClass("desk_active");
      $("#floating_results_count").addClass("active");
    }
    $(".facet_btn_dd.active").css("width", $("#swipe_up_inner").width());
    $(".facet_btn").each(function () {
      var scroll_to = $(this).offset().top - $("#swipe_up_inner").offset().top;
      $(this).attr("scroll_to", scroll_to);
    });

    set_entdecken();
    var height_matcher = manage_opened_fulltext();
    setTimeout(function () {
      clearInterval(height_matcher);
    }, 400);
  });
  // First get the viewport height and we multiple it by 1% to get a value for a vh unit
  var vh = window.innerHeight * 0.01;
  // Then set the value in the --vh custom property to the root of the document
  document.documentElement.style.setProperty("--vh", vh + "px");

  $("#info_cookie_close_1").click(function () {
    $(this).addClass("cookie_set");
    document.cookie = "cookie_warning = 1; expires=Fri, 31 Dec 2030 23:59:59 GMT ;path=/ ; SameSite=Lax";
    setCookie("selected_lang", "LANG_DE");

    $("#info_cookie_container").hide();
    $("#info_cookie_background").hide();
  });

  // setting cookie
  function setCookie(cname, cvalue) {
    // document.cookie = cname + "=" + cvalue + ";path=/;" + "HttpOnly;Secure;SameSite=Strict;";
    $.ajax({
      type: "POST",
      url: rootUrl + "Frontend/set_Cookie_from_js",
      data: {
        name: cname,
        value: cvalue,
      },
      success: function (data) {},
    });
  }

  // getting cookie
  function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(";");
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == " ") {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }

  bannerStuff();
  function bannerStuff() {
    var currentYear = new Date().getFullYear();

    if (currentYear != 2021) {
      $("#redBanner").hide();
    } else {
      setCookie("banner_clicked", true);
    }

    if ($("#info_cookie_container:visible").length) {
      setTimeout(function () {
        bannerStuff();
      }, 1000);
    } else {
      setTimeout(function () {
        $("#redBanner").fadeOut(1000);
        setCookie("banner_clicked", true);
      }, 10000);
    }
  }

  $("#redBanner").click(function () {
    $(this).hide();
    setCookie("banner_clicked", true);
  });
  //*****  language and translations ****//

  function set_language(lang) {
    $.ajax({
      type: "POST",
      url: rootUrl + "Frontend/changeLanguage",
      data: {
        lang: lang,
      },
      success: function (data) {
        location.reload();
      },
    });
  }

  $("#menu_lang_btn_container").click(function () {
    $("#menu_lang_btn_drop").slideToggle();
  });

  $(".lang_btn").click(function () {
    var lang = $(this).attr("lang");
    var mobile = $(this).hasClass("mobile_menu_btn");

    if (lang == "LANG_DE") {
      var new_lang = "LANG_DE";
      $("#menu_lang_btn").attr("lang", new_lang).text("DE");
      setCookie("selected_lang", "LANG_DE");
    } else if (lang == "LANG_EN") {
      var new_lang = "LANG_EN";
      $("#menu_lang_btn").attr("lang", new_lang).text("EN");
      setCookie("selected_lang", "LANG_EN");
    } else {
      setCookie("selected_lang", "LANG_DE");
    }

    setCookie("lang_change", "true");
    set_language(new_lang);
  });

  var current_lang = getCookie("selected_lang");
  if (current_lang != "") {
    $("#menu_lang_btn").attr("lang", current_lang);
    if (current_lang == "LANG_EN") {
      $("#menu_lang_btn").text("EN");
    } else if (current_lang == "LANG_DE") {
      $("#menu_lang_btn").text("DE");
    }
    current_lang = getCookie("selected_lang");
  } else {
    setCookie("selected_lang", "LANG_DE");
    current_lang = getCookie("selected_lang");
  }

  $("#full_text_flag").click(function () {
    $(this).toggleClass("active");
    if ($(this).hasClass("active")) {
      setCookie("current_full_text_flag", "true");
    } else {
      setCookie("current_full_text_flag", "false");
    }
  });

  if (!$("#full_text_flag").hasClass("set_from_query")) {
    var current_full_text_flag = getCookie("current_full_text_flag");
    if (current_full_text_flag != "") {
      if (current_full_text_flag == "true") {
        $("#full_text_flag").addClass("active");
      } else if (current_full_text_flag == "false") {
        $("#full_text_flag").removeClass("active");
      }
      current_full_text_flag = getCookie("current_full_text_flag");
    } else {
      current_full_text_flag = "false";
      setCookie("current_full_text_flag", current_full_text_flag);
    }
  }

  // translation

  var floating_results_count_text = "";

  // strings
  if (current_lang == "LANG_EN") {
    floating_results_count_text = "Loading results";
  } else if (current_lang == "LANG_DE") {
    floating_results_count_text = "Ergebnisse anzeigen";
  } else {
    floating_results_count_text = "Ergebnisse anzeigen";
  }

  function translate_this(word) {
    if (word in translations_array) {
      translated = translations_array[word].replace("+", " ");

      if (translated != "") {
        return decodeURI(translated);
      } else {
        return word;
      }
    } else {
      return word;
    }
  }

  //************* entdecken page *************//

  // show filters and sort button
  // hide filters and sort button if from highlight search
  if (window.location.pathname.indexOf("/highlight") != -1) {
    $("#search_tap, #search_tap_d").css("opacity", "0.5");
    $("#entdecken_tap, #entdecken_tap_d").css("opacity", "1");
    $("#results_main_container").width("100%");

    $("#search_sort_btn").hide();
    $("#swipe_up_container").hide();
  } else {
    /*  $("#search_sort_btn").show();
    $("#swipe_up_container").show(); */
  }

  var listElm = $("#highlight_blocks_container");

  // Add cloned items.
  var load_nr = 0;
  var loadMore = function (reverse) {
    if (reverse === undefined) {
      reverse = false;
    }

    var items = $(".highlight_original").clone();
    var item_type = reverse ? "highlight_before" : "highlight_after";
    items
      .addClass("highlight_clone")
      .addClass("highlight_clone_" + load_nr)
      .addClass(item_type)
      .removeClass("highlight_original")
      .removeClass("position_done");

    if (reverse) {
      var scroll_pos_before_add = $(document).scrollTop();
      var height_before_add = listElm.height();
      var add = 3 - (items.length % 3);
      for (var index = 0; index < add; index++) {
        var additional = $(".highlight_original").clone()[random_num(0, items.length - 1)];

        $(additional).removeClass("highlight_original");
        listElm.prepend(additional);
      }
      listElm.prepend(items);

      var height_after_add = listElm.height();
      var height_diff = height_after_add - height_before_add;

      $(document).scrollTop(scroll_pos_before_add + height_diff);
    } else {
      listElm.append(items);
    }
    load_nr++;
  };

  // Detect when scrolled

  $(document).scroll(function () {
    if ($(document).scrollTop() >= listElm.height() / 2) {
      loadMore();
    }
    if ($(document).scrollTop() < 1000) {
      loadMore(true);
    }

    set_entdecken();
    lazy_load_start();
  });

  // Initially load some items.
  loadMore();
  loadMore(true);

  // starting a search from entdecken page
  $(".highlight_url").click(function () {
    var keywords = $(this).attr("search").trim();
    var item_id = $(this).attr("item_id").trim();
    var query_id = $(this).attr("query_id").trim();
    // just item id new search
    if (query_id != "") {
      window.location.assign(rootUrl + "search/" + query_id);
    } else {
      window.location.assign(rootUrl + "search/highlight/" + item_id);
    }
  });

  // fixed nav top nav btns
  $(".info_btn").click(function () {
    $("#info_cookie_container").css("display", "flex");
    $("#info_cookie_background").fadeIn();
  });

  // mobile menu
  $("#mobile_menu_btn").click(function () {
    $(this).hasClass("active") ? $("#mobile_menu_dd").slideUp() : $("#mobile_menu_dd").slideDown();
    $(this).toggleClass("active");
    /* $("#mobile_menu_dd").toggleClass("active"); */
  });

  //*********** detail page **********//

  $(".keyword_search").click(function () {
    var keywords = $(this).text().trim();

    $.ajax({
      type: "POST",
      url: rootUrl + "Frontend/insert_query",
      data: {
        keywords: keywords,
        entdecken: false,
      },
      success: function (data) {
        $("#search_share_btn").attr("query_id", data);
        setCookie("share_btn", data);
        setCookie("current_query", data);
        setCookie("current_query2", data);
        setCookie("current_keyword", $("#search_field").val());

        document.location.assign(rootUrl + "search/" + data);
      },
    });
  });

  // download image
  $("#download_img_btn").click(function () {
    $("#download_img_pop").show();
    $("#download_img_pop_background").show();
  });

  $("#download_img_pop_btn_close,#download_img_pop_background").click(function () {
    $("#download_img_pop").hide();
    $("#download_img_pop_background").hide();
  });

  var current_keyword = getCookie("current_keyword");
  if (current_keyword !== "" && window.location.pathname.indexOf("/search") != -1) {
  }

  if ($("#detail_container").length == 1) {
  }

  //*********** search page **********//
  if (window.location.pathname.indexOf("/search") != -1) {
    childe_l = $(".active_filter_btns .active_btn").length;
    if (childe_l == 0) {
      $("#active_filters").hide();
    } else {
      $("#active_filters").show();
    }
  }
  if (window.location.pathname.indexOf("/search") == -1) {
  }

  // hide auto complete  if I click anywhere

  $("#auto_complete_background , #search_btn_container").click(function () {
    $("#auto_complete_container").hide();
    $("#auto_complete_background").hide();

    // close swipe up element when clicking outside it
    if ($("#swipe_up_inner").hasClass("open")) {
      // scroll to top when opend
      $("#swipe_up_inner").animate(
        {
          scrollTop: 0,
        },
        200
      );

      $("#swipe_up_inner").removeClass("open");
      $("#floating_results_count").removeClass("active");
      $("#auto_complete_background").hide();
    }
  });

  // share btn
  if (getCookie("share_btn") != null && getCookie("share_btn") != "") {
    $("#search_share_btn").attr("query_id", getCookie("share_btn"));
    $("#search_share_btn").css("display", "flex");
    /* $("#search_info_btns").addClass("searched"); */

    setCookie("share_btn", "");
  }
  $(".search_share_btn").click(function () {
    if ($(this).attr("id") == "search_share_btn") {
      var query_id = $("#search_share_btn").attr("query_id");
      copy = rootUrl + "search/" + query_id;
    } else if ($(this).attr("id") == "search_share_btn_2") {
      var query_id = $("#search_share_btn_2").attr("favs_share_id");
      copy = rootUrl + "favourites/" + query_id;
    }

    var $temp = $("<input>");
    $("body").append($temp);
    $temp.val(copy).select();
    document.execCommand("copy");
    $temp.remove();

    $(".copied").fadeIn(200);

    if (current_lang == "LANG_EN") {
      var text = "Your share link is ready to paste!";
    } else {
      var text = "Link ist in Ihrer Ablage!";
    }

    $(".copied").text(text);

    setTimeout(function () {
      $(".copied").fadeOut(200);
    }, 2000);
  });

  // change view style
  $(".view_btn").click(function () {
    if (!$(this).hasClass("active")) {
      var type = $(this).attr("type");
      $("body").removeClass("view_tile").removeClass("view_list");
      $(".view_btn").removeClass("active");
      $(this).addClass("active");
      $("body").addClass(type);
      localStorage.setItem("view_type", type);

      // cut long titles in the tile view

      cut_tile_view_titles();
      var height_matcher = manage_opened_fulltext();
      setTimeout(function () {
        clearInterval(height_matcher);
      }, 400);
    }
  });
  if (localStorage.getItem("view_type") != null) {
    var type = localStorage.getItem("view_type");
    $("body").addClass(type);
    $(".view_btn").removeClass("active");
    $(".view_btn[type='" + type + "']").addClass("active");
    cut_tile_view_titles();
  }

  function cut_tile_view_titles() {
    if ($("body").hasClass("view_tile")) {
      $(".search_result .result_text_middle a, .search_result  .result_text_bottom a").each(function () {
        var text = $(this).text().trim();
        var max_length = 50;

        if (text.length >= max_length) {
          var new_text = text.substring(0, max_length).trim() + "...";
          $(this).text(new_text);
          $(this).attr("full_text_val", text);
          $(this).addClass("text_is_cut");
        }
      });
    } else {
      $(".search_result .result_text_middle a.text_is_cut , .search_result  .result_text_bottom a.text_is_cut").each(function () {
        var text = $(this).attr("full_text_val");
        $(this).text(text);
        $(this).removeClass("text_is_cut");
      });
    }
  }

  $("#detail_share_btn").click(function () {
    var query_id = $("#detail_share_btn").attr("result_id");
    copy = rootUrl + "/result/" + query_id;

    var $temp = $("<input>");
    $("body").append($temp);
    $temp.val(copy).select();
    document.execCommand("copy");
    $temp.remove();

    $("#detail_copied").fadeIn(200);

    if (current_lang == "LANG_EN") {
      var text = "Your share link is ready to paste!";
    } else {
      var text = "Link ist in Ihrer Ablage!";
    }

    $("#detail_copied").text(text);

    setTimeout(function () {
      $("#detail_copied").fadeOut(200);
    }, 2000);
  });

  $("#search_results_container").on("click", ".full_text_count_container", function () {
    var btn = $(this);
    var full_text_target = $(this).attr("full_text_element");
    var snippet_url = $(this).attr("snippet_url");
    var result_item = $(this).parent().parent();

    if (btn.hasClass("active")) {
      // reset dropdowns
      $(".full_text_count_container").removeClass("active");
      $(".full_text_element").removeClass("active");
      $(".full_text_count_container .arrow_down").removeClass("active");
      $(".full_text_count_container").parent().parent().removeClass("full_text_active");
      $("#search_results_container").removeClass("full_text_opened");
      $("#full_text_sep_space").slideUp();
    } else {
      btn.find(".arrow_down").addClass("loading");

      $.ajax({
        type: "POST",
        url: rootUrl + "Frontend/full_text_snippet",
        data: {
          snippetUrl: snippet_url,
        },
        success: function (data) {
          var json = $.parseJSON(data);
          var results = $.parseJSON(json["results"]);
          var counter = 1;

          // reset dropdowns
          $(".full_text_count_container").removeClass("active");
          $(".full_text_element").removeClass("active");
          $(".full_text_count_container .arrow_down").removeClass("active");
          $(".full_text_count_container").parent().parent().removeClass("full_text_active");

          // $(full_text_target).find(".full_text_results_count").html(results.length);
          $(full_text_target).find(".full_text_results_container").html("");

          results.forEach((element) => {
            console.log(element.openUrl);

            var url_text = (current_lang == "LANG_EN") ? "Jump to text passage" : "Zur Textstelle springen";

            $(full_text_target)
              .find(".full_text_results_container")
              .append(
                "<div class='full_text_result'><div class='full_text_result_nr'>" +
                  counter +
                  "</div><div class='full_text_result_text'>" +
                  element.text +
                  "</div><a target='_blank' href='" +
                  element.openUrl +
                  "' class='full_text_result_url'>" +
                  url_text +
                  "</a></div>"
              );
            counter++;
          });

          // open this one
          btn.addClass("active");
          $(full_text_target).addClass("active");
          btn.find(".arrow_down").removeClass("loading").addClass("active");
          btn.parent().parent().addClass("full_text_active");

          $("#search_results_container").addClass("full_text_opened");

          // scroll to the opened element
          if ($(".view_tile").length != 0) {
            var height_matcher = manage_opened_fulltext();
            setTimeout(function () {
              /*    var element_po_before_scroll = result_item.offset().top;
              var scroll_to_element_pos = element_po_before_scroll - $("#search_results_container").offset().top - 18;

              $("#search_results_container").scrollTop(scroll_to_element_pos);

              var element_po_after_scroll = result_item.offset().top;
              var how_much_to_scroll =
                $("#search_results_container").scrollTop() + element_po_after_scroll - $("#search_results_container").offset().top - 18;
              $("#search_results_container").scrollTop(how_much_to_scroll); */
              clearInterval(height_matcher);
            }, 400);
          }
        },
      });
    }
  });

  function manage_opened_fulltext() {
    // set the width
    var full_text_target = $(".full_text_element.active");
    var sep_el = '<div id ="full_text_sep_space"></div>';
    var con_width = $("#search_results_container").width() - 20;

    var f_parent = full_text_target.parent();

    var f_p_index = $(".search_result").index(f_parent);

    var i = (add_sep_after = sum = break_after = 0);

    // full text element
    $(full_text_target).width(con_width);
    $(full_text_target).css("left", 0);
    var align_value = $("#results_main_container").offset().left - $(full_text_target).offset().left + 10;
    $(full_text_target).css("left", align_value);
    // sep element
    $(".search_result").each(function () {
      var f_width = $(this).width();
      sum += f_width;
      if (con_width >= sum) {
        i++;
      } else {
        break_after = i;
        return break_after;
      }
    });

    var new_sep_index = break_after - (f_p_index % break_after) + f_p_index;
    var current_sep_index = $("#search_results_container > div").index($("#full_text_sep_space"));

    if (current_sep_index != new_sep_index) {
      $("#full_text_sep_space").remove();
      $(sep_el).insertBefore($(".search_result")[new_sep_index]);
      var height_matcher = setInterval(function () {
        $("#full_text_sep_space").height(full_text_target.height());
      }, 10);
    } else {
      $("#full_text_sep_space").show();
      var height_matcher = setInterval(function () {
        if (full_text_target.height() > $("#full_text_sep_space").height()) {
          $("#full_text_sep_space").height(full_text_target.height());
        }
      }, 1);
    }

    return height_matcher;
  }

  // search btns filters
  $("#search_sort_btn").click(function () {
    if ($(this).hasClass("open")) {
      $(this).removeClass("open");
    } else {
      $(this).addClass("open");
    }

    $("#sort_drop").slideToggle(300);
  });

  // toggle active
  $("#search_btns .search_btn").click(function () {
    $(this).toggleClass("active");
  });

  $(".sort_nach").click(function () {
    setCookie("scroll_to", "");
    setCookie("scroll_to_element", "");
    $("#search_results_container").animate(
      {
        scrollTop: 0,
      },
      0
    );

    if ($(this).hasClass("active")) {
      $(this).removeClass("active");
      $("#sort_relevance").addClass("active");
    } else {
      $(".sort_nach").removeClass("active");
      $(this).addClass("active");
    }
    api_query(false, null, false, true);
  });
  $("#sort_selector").on("change", function (e) {
    setCookie("scroll_to", "");
    setCookie("scroll_to_element", "");
    $("#search_results_container").animate(
      {
        scrollTop: 0,
      },
      0
    );
    api_query(false, null, false, true);
  });

  // set result position cookie on click
  $("#search_results_container").on("mousedown", ".search_result a", function () {
    var result_position = $(this).offset().top - 210;
    var scroll_to_element = $(this).attr("href");
    scroll_to_element = scroll_to_element.split("/");
    scroll_to_element = scroll_to_element[scroll_to_element.length - 1];

    setCookie("scroll_to", result_position);
    setCookie("scroll_to_element", scroll_to_element);
    console.log(scroll_to_element);
    if (getCookie("current_query2") != null && getCookie("current_query2") != "") {
      setCookie("current_query", getCookie("current_query2"));
    }
  });

  // run empty query

  if ($("#search_container").length > 0) {
    if (ready_query != false) {
    }
    api_query();
  }

  //************ search field *********//

  // set focus to open keyboard
  $("#search_field").focus();

  $("#search_btn_container").click(function () {
    if (window.location.pathname.indexOf("/search") == -1) {
      var keywords = "";
      keywords = $("#search_field").val().trim();

      if ($("#full_text_flag.active").length > 0 && $("#search_field").val().trim() != "" && $("#search_field").val().trim() != "*") {
        var full_text = "&fulltext=true";
      } else {
        var full_text = "&fulltext=false";
        $("#full_text_flag").removeClass("active");
        setCookie("current_full_text_flag", "false");
      }

      //var test_prod = "reptest";
      var test_prod = "rep";
      var api_url = "https://digital.onb.ac.at/" + test_prod + "/discovery/public/search?query=" + keywords + full_text + "&rows=50&facetlimit=100";

      $.ajax({
        type: "POST",
        url: rootUrl + "Frontend/insert_query",
        data: {
          query: api_url,
          entdecken: true,
        },
        success: function (data) {
          $("#search_share_btn").attr("query_id", data);

          setCookie("current_query", data);
          setCookie("current_query2", data);
          setCookie("share_btn", data);
          setCookie("current_keyword", $("#search_field").val());
          document.location.assign(rootUrl + "search/" + data);
        },
      });
    } else {
      $("#swipe_up_inner .filter_btn.active , #swipe_up_inner .filter_btn_dd_yes.active , .active_yes, #swipe_up_inner .filter_btn_dd_no.active , .active_no").removeClass("active");
      $(".active_filter_btns").html("");
      $(".filter_von").val("");
      $(".filter_bis").val("");
      $("#active_filters").hide();
      var $this = $(this);
      // reset filters
      $(".active_filter_btns").html("");
      $(".sort_nach").removeClass("active");
      $("#sort_relevance").addClass("active");
      // reset cookies
      setCookie("scroll_to", "");
      setCookie("scroll_to_element", "");
      setCookie("results_count", "");
      api_query(false, null, false, true);
    }
    // scroll back to top
    setTimeout(function () {
      $("#search_results_container").animate(
        {
          scrollTop: 0,
        },
        0
      );
    }, 200);
  });
  $("#full_text_info_icon").click(function () {
    $(this).toggleClass("active");
    $("#full_text_info_text").toggleClass("active");
  });

  // search field auto complete
  var snr = 0;
  $("#search_field").on("keyup", function () {
    var key_words = $("#search_field").val();
    var keycode = event.keyCode ? event.keyCode : event.which;

    // submiting with enter btn
    if (keycode == "13") {
      $("#search_btn_container").click();
      $("#auto_complete_container").hide();
    } else if (keycode == "38" || keycode == "40") {
      // up and down

      if (keycode == "38") {
        snr = snr - 1;
      }
      if (keycode == "40") {
        snr = snr + 1;
      }

      if (snr > $(".auto_complete_result").length) {
        snr = 1;
        $("#auto_complete_container").animate(
          {
            scrollTop: 0,
          },
          0
        );
      } else if (snr <= 0) {
        snr = $(".auto_complete_result").length;
      }

      $(".auto_complete_result").removeClass("auto_complete_result_selected");
      var current_selected = $(".auto_complete_result:nth-child(" + snr + ")");
      current_selected.addClass("auto_complete_result_selected");

      var container_h = $("#auto_complete_container").height();
      var selected_result_h = current_selected.height();
      var selected_result_po = current_selected.offset().top;

      if (selected_result_po > container_h) {
        $("#auto_complete_container").animate(
          {
            scrollTop: selected_result_po - container_h + 10,
          },
          0
        );
      } else if (selected_result_po > 132) {
        $("#auto_complete_container").animate(
          {
            scrollTop: -selected_result_h,
          },
          0
        );
      }
      var val = current_selected.find(".auto_complete_keywords").text().trim();
      $("#search_field").val(val);
    } else {
      if (key_words.length > 2) {
        find_auto_complete_words(key_words);
        $("#auto_complete_container").show();
        $("#auto_complete_background").show();
        // $('#search_share_btn').hide()
      } else {
        $("#auto_complete_container").hide();
        $("#auto_complete_background").hide();
      }
    }

    // auto complete filling
    $("#auto_complete_container").on("click", ".auto_complete_result", function (e) {
      var clicked = $(this).attr("clicked");
      if (clicked != "true") {
        var val = $(this).find(".auto_complete_keywords").text().trim();
        $("#search_field").val(val);
        $("#auto_complete_container").hide();
        $("#auto_complete_background").hide();
        $("#search_btn_container").click();
        $(this).attr("clicked", "true");
      }
    });
  });

  //************ end search field *********//

  // ******** results scroll  ******* //
  // run query to get more results
  var can_scroll = true;
  var lastScrollTop = 0;
  $("#search_results_container").on("scroll", function () {
    var results = document.getElementsByClassName("search_result");
    var from = results.length;

    var current_query = getCookie("current_query");
    if (current_query.indexOf("highlight/") == -1) {
      if (from > 35 && $("#no_result_found").length == 0) {
        var last_result = results[from - 1];

        var middle_result = results[from - 30];
        if ($("body").hasClass("view_tile") && from > 90) {
          var middle_result = results[from - 90];
        }

        var last_result_position = last_result.getBoundingClientRect().bottom + 184;
        var middle_result_position = middle_result.getBoundingClientRect().bottom + 184;
        var result_container_position = document.getElementById("search_results_container").getBoundingClientRect().bottom;
        if (last_result_position < result_container_position + 100 && last_result_position > result_container_position - 100) {
          if (can_scroll) {
            api_query(false, from, true, false);
            var results = document.getElementsByClassName("search_result").length + 50;
            setCookie("results_count", results);
            can_scroll = false;
            reactivate_can_scroll();
          }
        }
        if (middle_result_position < result_container_position + 100 && middle_result_position > result_container_position - 100) {
          if (can_scroll) {
            api_query(false, from, true, false);
            var results = document.getElementsByClassName("search_result").length + 50;
            setCookie("results_count", results);
            can_scroll = false;
            reactivate_can_scroll();
          }
        }
      }
    }

    // change front end for small height and width screens
    if ($(window).height() < 900 && $(window).width() < 900) {
      var st = $(this).pageYOffset || $(this).scrollTop();
      if (st > lastScrollTop) {
        $("#swipe_up_container").css("bottom", "-50px");
      } else {
        if ($(window).height() < 650 || $(window).width() < 360) {
          $("#swipe_up_container").css("bottom", "55px");
        } else {
          $("#swipe_up_container").css("bottom", "70px");
        }
      }
      lastScrollTop = st <= 0 ? 0 : st; // For Mobile or negative scrolling
    }
  });

  function reactivate_can_scroll() {
    setTimeout(function () {
      can_scroll = true;
    }, 2000);
  }
  // ******** end results scroll  ******* //

  //*****    swipe up element   *****/

  $("#swipe_up_header , .swipe_up_hr, #click").click(function () {
    $("#swipe_up_inner").toggleClass("open");

    // close when clicking outside
    $("#auto_complete_background").show();

    // scroll to top when opend
    $("#swipe_up_inner").animate(
      {
        scrollTop: 0,
      },
      200
    );

    // close auto complete
    $("#auto_complete_container").hide();

    if ($("#swipe_up_inner").hasClass("open")) {
      $("#swipe_up_inner.open").css("height", 7 * (window.innerHeight / 10) + "px");
    } else {
      $("#swipe_up_inner").css("height", 0);
    }

    // floating results count on any filter click
    if (!$("#swipe_up_inner").hasClass("open")) {
      $("#floating_results_count").removeClass("active");
      $("#auto_complete_background").hide();
    } else if ($("#swipe_up_inner .filter_btn.active").length > 0 || $("#swipe_up_inner .filter_btn_dd_yes.active").length > 0 || $("#swipe_up_inner .filter_btn_dd_no.active").length > 0) {
      $("#floating_results_count").addClass("active");
    }
  });
  $("#search_logo_nav").click(function () {
    // close swipe up element when clicking outside it

    if ($("#swipe_up_inner").hasClass("open")) {
      // scroll to top when opend
      $("#swipe_up_inner").animate(
        {
          scrollTop: 0,
        },
        200
      );

      $("#swipe_up_inner").removeClass("open");
      $("#floating_results_count").removeClass("active");
      $("#auto_complete_background").hide();
      $("#swipe_up_inner.open").css("height", 7 * (window.innerHeight / 10) + "px");
    } else {
      $("#swipe_up_inner").css("height", 0);
    }
  });

  // floating results count on any filter click
  if (!$("#swipe_up_inner").hasClass("open")) {
    $("#floating_results_count").removeClass("active");
  }

  // removing an active filter
  $("#swipe_up_container").on("click", ".active_btn img", function () {
    // reset years when click on active btn close X

    if ($(this).parent(".active_btn").hasClass("years_active_btn")) {
      $(".filter_von").val("");
      $(".filter_bis").val("");
    }

    var facet_value = $(this).parent(".active_btn").attr("facet_value");

    $('.filter_btn.active[facet_value="' + facet_value + '"]').removeClass("active");
    $('.filter_btn_dd_yes.active[facet_value="' + facet_value + '"]').removeClass("active");
    $('.filter_btn_dd_no.active[facet_value="' + facet_value + '"]').removeClass("active");
    $(this).parent(".active_btn").remove();

    $("#loading_filter").show();
    $("#loading_filter").css("top", $("#active_filters").height() + 5 + "px");

    if ($(window).width() < 950) {
      $("#floating_results_count .floating_results_count_text").html(floating_results_count_text);
      $("#floating_results_count").addClass("active");
    }

    api_query();

    childe_1 = $(".active_filter_btns .active_btn").length;

    if (childe_1 == 0) {
      $("#active_filters").css("visibility", "hidden");
    } else {
      $("#active_filters").css("visibility", "visible");
    }
  });

  // getting results count on clicking a filter
  var just_clicked = false;
  $("#swipe_up_container").on("click", ".filter_btn , .filter_btn_dd_no , .filter_btn_dd_yes", function () {
    just_clicked = true;
    clearTimeout(time);
    var time = setTimeout(function () {
      just_clicked = false;
    }, 500);

    var sf = $("#search_field");
    $("#floating_results_count .floating_results_count_text").html(floating_results_count_text);
    $("#floating_results_count").addClass("active");

    setTimeout(function () {
      if (just_clicked) {
        clearTimeout(time);
      } else {
        api_query((count = true));
      }
      childe_1 = $(".active_filter_btns .active_btn").length;

      if (childe_1 == 0) {
        $("#active_filters").css("visibility", "hidden");
      } else {
        $("#active_filters").css("visibility", "visible");
      }
    }, 1000);
  });

  // var can_search = false;
  var just_typed = false;
  var run_time = null;
  $("#facet_html").on("keydown", ".filter_von , .filter_bis", function (e) {
    var keycode = event.keyCode ? event.keyCode : event.which;
    if (keycode == "38") {
      var val = parseInt($(this).val());
      if ($(this).val() == "") {
        $(this).val(1);
      } else {
        $(this).val(val + 1);
      }
    }
    if (keycode == "40") {
      var val = parseInt($(this).val());
      if ($(this).val() == "") {
        $(this).val(0);
      } else {
        $(this).val(val - 1);
      }
    }
    just_typed = true;
    clearTimeout(run_time);
  });

  $("#facet_html").on("keyup", ".filter_von , .filter_bis", function (e) {
    $("#floating_results_count .floating_results_count_text").html(floating_results_count_text);
    $("#floating_results_count").addClass("active");
    just_typed = true;
    clearTimeout(run_time);
    setTimeout(function () {
      just_typed = false;
    }, 1000);
    run_time = setTimeout(function () {
      if (!just_typed) {
        api_query((count = true));
      }
    }, 2000);
  });

  // excute search on sliding
  $("#facet_html").on("mousedown", "#slider-range", function (e) {
    just_typed = true;

    clearTimeout(run_time);

    setTimeout(function () {
      just_typed = false;
    }, 1000);

    run_time = setTimeout(function () {
      if (!just_typed) {
        api_query((count = true));
      }
    }, 2000);

    $("#floating_results_count .floating_results_count_text").html(floating_results_count_text);
    $("#floating_results_count").addClass("active");
  });

  // also excute if slider changed with keys input
  $("#facet_html").on("keydown", function (e) {
    var keycode = event.keyCode ? event.keyCode : event.which;
    if (keycode == "38" || keycode == "40" || keycode == "37" || keycode == "39") {
      if ($(".ui-slider-handle").hasClass("ui-state-focus")) {
        just_typed = true;
        clearTimeout(run_time);
        setTimeout(function () {
          just_typed = false;
        }, 1000);
        run_time = setTimeout(function () {
          if (!just_typed) {
            api_query((count = true));
          }
        }, 2000);
      }
    }
  });

  // results count
  $("#floating_results_count").click(function () {
    // var sf = $('#search_field');
    // var sfv = sf.val();
    api_query(false, null, false, true);

    $("#swipe_up_inner").removeClass("open");
    if ($("#swipe_up_inner").hasClass("open")) {
      $("#swipe_up_inner.open").css("height", 7 * (window.innerHeight / 10) + "px");
    } else {
      $("#swipe_up_inner").css("height", 0);
    }

    if ($(".active_btn").length == 0) {
      // here
      $("#active_filters").css("display", "none");
    } else {
      $("#active_filters").css("display", "block");
      $("#active_filters").css("visibility", "visible");
    }

    $("#floating_results_count").removeClass("active");
    $("#auto_complete_background").hide();
  });
  // filters drop down if more than 3 buttons

  $("#facet_html").on("click", ".filter_drop_down_btn", function () {
    $(this).find(".drop_arrow").toggleClass("active");
    $(this).siblings(".filter_drop_down").slideToggle();
  });

  // activate yes and no filters to use them in the search
  $("#facet_html").on("click", ".filter_drop_down .filter_btn_dd_yes ,.filter_drop_down .filter_btn_dd_no", function () {
    if ($(this).hasClass("active")) {
      var facet_value = $(this).attr("facet_value");
      $('.active_btn[facet_value="' + facet_value + '"]').remove();
      $(this).toggleClass("active");
    } else {
      if ($(this).hasClass("filter_btn_dd_yes")) {
        var facet_value = $(this).attr("facet_value");
        $('.active_no[facet_value="' + facet_value + '"]').remove();
      }

      if ($(this).hasClass("filter_btn_dd_no")) {
        var facet_value = $(this).attr("facet_value");
        $('.active_yes[facet_value="' + facet_value + '"]').remove();
      }

      $(this).siblings().removeClass("active");

      $(this).toggleClass("active");
    }
  });

  (function set_facets_scroll() {
    return set_facets_scroll;
  })();

  var set_facets_scroll = (function return_this() {
    $(".facet_btn").each(function () {
      var scroll_to = $("#swipe_up_inner").scrollTop() + ($(this).offset().top - $("#swipe_up_inner").offset().top);
      $(this).attr("scroll_to", scroll_to);
    });
    return return_this;
  })();

  // facets dd position adjustments
  $("#facet_html").on("click", ".facet_btn", function () {
    var btn = $(this);
    var facet_btn_dd = $(this).siblings(".facet_btn_dd");
    var facet_dd_arrow = $(this).siblings(".facet_dd_arrow");

    $("#facet_dd_sep_space").fadeOut();

    if (facet_btn_dd.hasClass("active")) {
      facet_btn_dd.toggleClass("active");
      facet_btn_dd.slideToggle();
      setTimeout(function () {
        facet_dd_arrow.toggleClass("active");
      }, 300);
    } else {
      // manage the sep
      var sep_el = '<div id ="facet_dd_sep_space"></div>';
      var add_sep_after = 0;
      var f_parent = $(this).parent();
      var f_p_index = $(".facet_container").index(f_parent);
      var con_width = $(".filter_block.facets").width();
      var i = 0;
      var sum = 0;
      var break_after = 0;

      $(".facet_container").each(function () {
        var f_width = $(this).width() + 20;
        sum += f_width;
        if (con_width < sum) {
          break_after = i;
          return break_after;
        } else {
          i++;
        }
      });

      $("#facet_dd_sep_space").remove();
      add_sep_after = break_after - (f_p_index % break_after);
      $(sep_el).insertBefore($(".facet_container")[f_p_index + add_sep_after]);
      $("#facet_dd_sep_space").height(520).css("max-height", "52vh");

      // end manage the sep

      // scroll to that facet btn
      /* var scroll_to = $(this).attr("scroll_to"); */

      $(".facet_btn_dd").removeClass("active");
      $(".facet_btn_dd").slideUp(0);
      $(".facet_dd_arrow").removeClass("active");
      facet_btn_dd.toggleClass("active");
      facet_btn_dd.slideToggle();
      facet_dd_arrow.toggleClass("active");

      setTimeout(function () {
        $("#swipe_up_inner").animate(
          {
            scrollTop: $("#swipe_up_inner").scrollTop() + (btn.offset().top - $("#swipe_up_inner").offset().top),
          },
          200
        );
      }, 302);
    }

    var facet_btns = document.getElementsByClassName("facet_container");
    for (var index = 0; index < facet_btns.length; index++) {
      var facet_btn = facet_btns[index];
      var facet_btn_dd = $(facet_btn).find(".facet_btn_dd");
      var new_margin = facet_btns[0].offsetLeft - facet_btn.offsetLeft;
      facet_btn_dd.css("left", new_margin);

      facet_btn_dd.css("width", $("#swipe_up_inner").width() - 10);
    }
  });

  $("#facet_html").on("click", ".facet_btn_dd .filter_btn_dd_yes ,.facet_btn_dd .filter_btn_dd_no", function () {
    var facet_value = $(this).attr("facet_value");
    if ($(this).hasClass("active")) {
      $('.active_btn[facet_value="' + facet_value + '"]').remove();
      $(this).toggleClass("active");

      $(this).attr("btn_filter_layer", 0);
    } else {
      // second layer filtering
      $(this).siblings().attr("btn_filter_layer", 0);
      if ($("#swipe_up_header").attr("filter_layer") == 1) {
        $(this).attr("btn_filter_layer", 1);
      } else {
        $(this).attr("btn_filter_layer", 0);
      }

      if ($(this).hasClass("filter_btn_dd_yes")) {
        $('.active_no[facet_value="' + facet_value + '"]').remove();
      }
      if ($(this).hasClass("filter_btn_dd_no")) {
        $('.active_yes[facet_value="' + facet_value + '"]').remove();
      }

      $(this).siblings().removeClass("active");
      $(this).toggleClass("active");
    }
    var facets = $(".facet_container");
    facets.each(function (element) {
      var active_elements = $(facets[element]).find(".filter_btn_dd_yes.active").length + $(facets[element]).find(".filter_btn_dd_no.active").length;
      var count_holder = $(facets[element]).find(".filter_btn_count");

      if (active_elements > 0) {
        count_holder.show();
      }
      count_holder.html(active_elements);
    });
    var count_elements = $(".filter_btn_count");
    count_elements.each(function (e) {
      if ($(count_elements[e]).html() == 0) {
        $($(".filter_btn_count")[e]).hide();
      }
    });
  });

  $("#facet_html").on("click", ".filter_btn", function () {
    if ($(this).hasClass("active")) {
      var facet_value = $(this).attr("facet_value");
      $('.active_btn[facet_value="' + facet_value + '"]').remove();

      // second layer filtering

      $(this).attr("btn_filter_layer", 0);
    } else {
      // second layer filtering
      if ($("#swipe_up_header").attr("filter_layer") == 1) {
        $(this).attr("btn_filter_layer", 1);
      } else {
        $(this).attr("btn_filter_layer", 0);
      }
    }

    $(this).toggleClass("active");
  });

  // searching filter btns
  $("#filters_container").on("keyup", ".search_container_dd", function () {
    var filter = $(this).find(".search_field_dd").val();
    filter = filter.trim();
    if (filter != "") {
      $(this).siblings(".filter_btn_dd").css("display", "none");
      $(this)
        .siblings(".filter_btn_dd:containsInsensitive(" + filter + ")")
        .css("display", "flex");

      var filter_search_result_count = $(this).siblings(".filter_btn_dd:containsInsensitive(" + filter + ")").length;
      $(this)
        .find(".filter_search_result_count")
        .text("( " + filter_search_result_count + " )");
    } else {
      var filter_search_result_count = $(this).siblings(".filter_btn_dd").length;
      $(this)
        .find(".filter_search_result_count")
        .text("( " + filter_search_result_count + " )");
      $(this).siblings(".filter_btn_dd").css("display", "flex");
    }
  });
  // for case insensitive search
  jQuery.expr[":"].containsInsensitive = function (a, i, m) {
    return jQuery(a).text().toUpperCase().indexOf(m[3].toUpperCase()) >= 0;
  };

  var facet_btns = document.getElementsByClassName("facet_container");
  for (var index = 0; index < facet_btns.length; index++) {
    var facet_btn = facet_btns[index];
    var facet_btn_dd = $(facet_btn).find(".facet_btn_dd");
    var new_margin = facet_btns[0].offsetLeft - facet_btn.offsetLeft;
    facet_btn_dd.css("left", new_margin);
  }

  //*****  end  swipe up element   *****/

  //*******  swipe up and down  ability *******//
  $(function () {
    // initializes touch and scroll events
    var supportTouch = $.support.touch,
      scrollEvent = "touchmove scroll",
      touchStartEvent = supportTouch ? "touchstart" : "mousedown",
      touchStopEvent = supportTouch ? "touchend" : "mouseup",
      touchMoveEvent = supportTouch ? "touchmove" : "mousemove";

    // handles swipe up and swipe down
    $.event.special.swipeupdown = {
      setup: function () {
        var thisObject = this;
        var $this = $(thisObject);

        $this.bind(touchStartEvent, function (event) {
          var data = event.originalEvent.touches ? event.originalEvent.touches[0] : event,
            start = {
              time: new Date().getTime(),
              coords: [data.pageX, data.pageY],
              origin: $(event.target),
            },
            stop;

          function moveHandler(event) {
            if (!start) {
              return;
            }

            var data = event.originalEvent.touches ? event.originalEvent.touches[0] : event;
            stop = {
              time: new Date().getTime(),
              coords: [data.pageX, data.pageY],
            };

            // prevent scrolling
            if (Math.abs(start.coords[1] - stop.coords[1]) > 10) {
              event.preventDefault();
            }
          }

          $this.bind(touchMoveEvent, moveHandler).one(touchStopEvent, function (event) {
            $this.unbind(touchMoveEvent, moveHandler);
            if (start && stop) {
              if (stop.time - start.time < 1000 && Math.abs(start.coords[1] - stop.coords[1]) > 30 && Math.abs(start.coords[0] - stop.coords[0]) < 75) {
                start.origin.trigger("swipeupdown").trigger(start.coords[1] > stop.coords[1] ? "swipeup" : "swipedown");
              }
            }
            start = stop = undefined;
          });
        });
      },
    };
    //Adds the events to the jQuery events special collection
    $.each(
      {
        swipedown: "swipeupdown",
        swipeup: "swipeupdown",
      },
      function (event, sourceEvent) {
        $.event.special[event] = {
          setup: function () {
            $(this).bind(sourceEvent, $.noop);
          },
        };
      }
    );
    $("#swipe_up_header").on("swipeup", function () {
      $("#swipe_up_inner").addClass("open");
    });
    $("#swipe_up_header").on("swipedown", function () {
      $("#swipe_up_inner").removeClass("open");
    });
    if ($("#swipe_up_inner").hasClass("open")) {
      $("#swipe_up_inner.open").css("height", 7 * (window.innerHeight / 10) + "px");
    } else {
      $("#swipe_up_inner").css("height", 0);
    }
  });

  //*******  end swipe control  *******//

  // full query

  function api_query(count, from, auto_complete, save_query) {
    if (count === undefined) {
      count = false;
    }
    if (from === undefined) {
      from = null;
    }
    if (auto_complete === undefined) {
      auto_complete = false;
    }
    if (save_query === undefined) {
      save_query = false;
    }

    var sort = "";
    var order = "";

    if ($("#full_text_flag.active").length > 0 && $("#search_field").val().trim() != "" && $("#search_field").val().trim() != "*") {
      var full_text = "true";
    } else {
      var full_text = "false";
      $("#full_text_flag").removeClass("active");
      setCookie("current_full_text_flag", "false");
    }

    var keywords = $("#search_field").val();
    var auto_complete = auto_complete;
    var from = from;
    var rows = 50;
    var count = count;
    var filters_array = {};
    var filters_no_array = {};
    var filters_yes_array = {};

    var filters = $("#swipe_up_inner .filter_btn.active , #swipe_up_inner .filter_btn_dd_yes.active , .active_yes");
    var filters_no = $("#swipe_up_inner .filter_btn_dd_no.active , .active_no");

    var years_von = $(".filter_von").length == 0 ? $(".years_active_btn").attr("from") : $(".filter_von").val();
    var years_bis = $(".filter_bis").length == 0 ? $(".years_active_btn").attr("to") : $(".filter_bis").val();

    // var years_von = $('#slider-range').attr("von");
    // var years_bis = $('#slider-range').attr("bis");

    var i = "";
    var l = "";
    var facet = "";

    var results_count = getCookie("results_count");
    var search_page = false;

    if (window.location.pathname == "/onb_digital/search/" || window.location.pathname == "/") {
      search_page = true;
    }
    if (results_count != "" && auto_complete == false) {
      rows = results_count;
      setCookie("results_count", "");
    }

    /*   if (keywords == "") {
      keywords = "*";
    }
 */
    filters_array["keywords"] = keywords;
    filters_array["fulltext"] = full_text;

    filters_array["years"] = {
      von: years_von,
      bis: years_bis,
    };

    filters.each(function (index) {
      var filter_layer = $(this).attr("btn_filter_layer");
      var facet = $(this).attr("facet");
      var facet_value = $(this).attr("facet_value");

      if (filter_layer == 0 || filter_layer == undefined) {
        // first layer filtering
        if (i == facet + "yes") {
          if (filters_array[facet]["yes"].indexOf(facet_value) == -1) {
            filters_array[facet]["yes"].push(facet_value);
          }
        } else {
          if (!filters_array[facet]) {
            filters_array[facet] = {};
          }
          filters_array[facet]["yes"] = [];
          filters_array[facet]["yes"].push(facet_value);
          i = facet + "yes";
        }
      } else {
        // second layer filtering
        if (l == facet + "second_filter_layer") {
          if (filters_array[facet]["second_filter_layer"].indexOf(facet_value) == -1) {
            filters_array[facet]["second_filter_layer"].push(facet_value);
          }
        } else {
          if (!filters_array[facet]) {
            filters_array[facet] = {};
          }
          filters_array[facet]["second_filter_layer"] = [];
          filters_array[facet]["second_filter_layer"].push(facet_value);
          l = facet + "second_filter_layer";
        }
      }

      // add the active filters
      if ($('.active_btn[facet_value="' + facet_value + '"]').length == 0) {
        var active_filter_btn =
          '<div class="active_btn active_yes" btn_filter_layer="' +
          filter_layer +
          '" facet="' +
          facet +
          '"  facet_value="' +
          facet_value +
          '"><span class="translate" translate="' +
          facet_value +
          '">' +
          translate_this(facet_value) +
          '</span><img src="' +
          rootUrl +
          '/items/frontend/img/no_black.png" alt=""></div>';
        $(".active_filter_btns").append(active_filter_btn);
      }
    });

    filters_no.each(function (index) {
      var facet = $(this).attr("facet");
      var facet_value = $(this).attr("facet_value");

      if (i == facet + "no") {
        if (filters_array[facet]["no"].indexOf(facet_value) == -1) {
          filters_array[facet]["no"].push(facet_value);
        }
      } else {
        if (!filters_array[facet]) {
          filters_array[facet] = {};
        }
        filters_array[facet]["no"] = [];
        filters_array[facet]["no"].push(facet_value);
        i = facet + "no";
      }

      // add the active filters
      if ($('.active_no[facet_value="' + facet_value + '"]').length == 0) {
        var active_filter_btn =
          '<div class="active_btn active_no" facet="' +
          facet +
          '" facet_value="' +
          facet_value +
          '"><span class="translate" translate="' +
          facet_value +
          '">	' +
          translate_this(facet_value) +
          '</span><img src="' +
          rootUrl +
          '/items/frontend/img/no_black.png" alt=""></div>';
        $(".active_filter_btns").append(active_filter_btn);
      }
    });

    // add date active filters
    if (years_von != "" && typeof years_von !== "undefined" && years_bis != "" && typeof years_bis !== "undefined") {
      var active_filter_btn =
        '<div class="active_btn years_active_btn" from="' +
        years_von +
        '"  to="' +
        years_bis +
        '"><span >' +
        years_von +
        " - " +
        years_bis +
        '</span><img src="' +
        rootUrl +
        '/items/frontend/img/no_black.png" alt=""></div>';
      $(".years_active_btn").remove();
      $(".active_filter_btns").append(active_filter_btn);
    }

    if ($("#sort_drop:visible").length != 0) {
      if ($(".sort_nach").hasClass("active")) {
        var sort_by = $(".sort_nach.active").attr("sort");
        var order = $(".sort_nach.active").attr("order");
        filters_array["sort"] = sort_by + "+" + order;
      }
    } else {
      var sort_by = $(".select_sort_nach:selected").attr("sort");
      var order = $(".select_sort_nach:selected").attr("order");
      filters_array["sort"] = sort_by + "+" + order;
    }

    filters_array = JSON.stringify(filters_array);

    //***********  php version *****//
    if (document.getElementById("phpsearch_container") != null) {
      if (count != true && auto_complete != true) {
        setTimeout(function () {
          document.getElementById("loading").style.display = "flex";
        }, 200);
        document.getElementById("loading").style.display = "flex";
        $("#search_results_container").css("opacity", "0");
        if ($(".active_btn").length == 0) {
          $("#active_filters").css("display", "none");
        } else {
          $("#active_filters").css("display", "block");
        }
      }

      var api_query = "";
      if (ready_query != false) {
        api_query = ready_query;
        api_url = "Frontend/search_api_search";
        data = {
          api_query: api_query,
          item_id: item_id,
          keywords: keywords,
          from: from,
          rows: rows,
          auto_complete: auto_complete,
          filters_array: filters_array,
        };
      } else {
        api_url = "Frontend/search_api_search";
        data = {
          api_query: api_query,
          keywords: keywords,
          from: from,
          rows: rows,
          auto_complete: auto_complete,
          filters_array: filters_array,
        };
      }

      $.ajax({
        type: "POST",
        url: rootUrl + api_url,
        data: data,
        success: function (data) {
          var data = $.parseJSON(data);
          var api_url = decodeURI(data["api_url"]);
          var results_container = data["results_container"];
          var facets_container = data["facets_container"];
          var active_filters_html = data["active_filters_html"];
          var result_count = data["results_count"];

          var show = "anzeigen";
          var result_text = "Ergebnisse";
          var filter_text = " Filter";
          var filter_text_active = "Filter aktiviert";

          if (current_lang == "LANG_EN") {
            var show = "Show";
            var result_text = "results";
            var filter_text = "Filters";
            var filter_text_active = "Filter activated";
          }

          if (result_count == 1 || result_count == "1") {
            if (current_lang == "LANG_DE") {
              result_text = result_text.slice(0, -2);
            } else {
              result_text = result_text.slice(0, -1);
            }
          }

          if (current_lang == "LANG_DE") {
            show_result_text = result_text + " " + show;
            show = "";
          } else if (current_lang == "LANG_EN") {
            show_result_text = result_text;
          } else {
            show_result_text = result_text + " " + show;
            show = "";
          }

          if (count == true) {
            // $('#floating_results_count .search_count').text(result_count.toLocaleString().replace(/,/g, '.'));
            $("#floating_results_count .floating_results_count_text").html(show + ' <b class="search_count">' + result_count.toLocaleString().replace(/,/g, ".") + "</b> " + show_result_text);
          } else {
            document.getElementById("loading").style.display = "flex";

            // results
            $("#floating_results_count .floating_results_count_text").html(show + ' <b class="search_count">' + result_count.toLocaleString().replace(/,/g, ".") + "</b> " + show_result_text);
            $(".search_count").text(result_count.toLocaleString().replace(/,/g, "."));
            $("#ergebnisse").text(result_text);

            $(".empty_search_result").remove();

            // scroll loading
            if (from != null) {
              $("#search_results_container").append(results_container);
              $("#no_result_found").remove();
            } else {
              $("#facet_html").html(facets_container);
              $("#search_results_container").html(results_container);

              // reset scrolling in facets and results
              set_facets_scroll();
              setCookie("results_count", "");
              $("#search_results_container").animate(
                {
                  scrollTop: 0,
                },
                200
              );

              setTimeout(function () {
                $(".filter_von").val(years_von);
                $(".filter_bis").val(years_bis);

                var new_years_von = years_von != "" && typeof years_von !== "undefined" ? years_von : $(".filter_von").attr("placeholder");
                var new_years_bis = years_bis != "" && typeof years_bis !== "undefined" ? years_bis : $(".filter_bis").attr("placeholder");

                $("#slider-range").attr("von", new_years_von);
                $("#slider-range").attr("bis", new_years_bis);
                $(".ui-slider-handle:first").html("<span>" + new_years_von + "</span>");
                $(".ui-slider-handle:last").html("<span>" + new_years_bis + "</span>");

                $("#slider-range").slider({
                  values: [new_years_von, new_years_bis],
                });

                if (years_von != "" && typeof years_von !== "undefined" && years_bis != "" && typeof years_bis !== "undefined") {
                  var active_filter_btn =
                    '<div class="active_btn years_active_btn" from="' +
                    new_years_von +
                    '"  to="' +
                    new_years_bis +
                    '"><span >' +
                    new_years_von +
                    "-" +
                    new_years_bis +
                    '</span><img src="' +
                    rootUrl +
                    '/items/frontend/img/no_black.png" alt=""></div>';
                  $(".years_active_btn").remove();
                  $(".active_filter_btns").append(active_filter_btn);
                }
              }, 500);
            }
            // re initiat after adding the results list
            lazy_load_start();

            // cut long tile view titles
            cut_tile_view_titles();
            // show results and hide loader
            $("#search_results_container").css("opacity", "1");
            document.getElementById("loading").style.display = "none";
            setTimeout(function () {
              document.getElementById("loading").style.display = "none";
            }, 300);

            // dynamic filtern header and used in filter layers
            childe_l = $(".active_filter_btns").children(".active_btn").length;

            if (childe_l == 0) {
              $("#swipe_up_header").text(filter_text).attr("filter_layer", 0);
            } else {
              if (childe_l > 1) {
                filter_text_active = filter_text_active.replace(/Filter/g, filter_text);
              }
              $("#swipe_up_header")
                .text(childe_l + " " + filter_text_active)
                .attr("filter_layer", 1);
            }

            // highlight date
            // if ($('.sort_nach[sort="startdate"]').hasClass('active')) {
            // 	$('.result_text_bottom.date').addClass('active');
            // } else {
            // 	$('.result_text_bottom.date').removeClass('active');
            // }
          }

          // save query
          // save the query to the database
          if (save_query) {
            $.ajax({
              type: "POST",
              url: rootUrl + "Frontend/insert_query",
              data: {
                query: api_url,
              },
              success: function (data) {
                $("#search_share_btn").attr("query_id", data);
                setCookie("current_query", data);
                setCookie("current_query2", data);
                setCookie("current_keyword", $("#search_field").val());
                if (window.location.pathname.indexOf("/search") == -1) {
                  document.location.assign(rootUrl + "search/" + data);
                }
                window.history.replaceState({}, "", rootUrl + "search/" + data);
                $("#search_share_btn").css("display", "flex");
                $("#search_info_btns").addClass("searched");
                // show filters and sort button
                if (window.location.pathname.indexOf("/highlight") != -1) {
                  $("#search_tap, #search_tap_d").css("opacity", "0.5");
                  $("#entdecken_tap, #entdecken_tap_d").css("opacity", "1");
                  $("#search_sort_btn").hide();
                  $("#swipe_up_container").hide();
                } else {
                  $("#search_sort_btn").show();
                  $("#swipe_up_container").show();
                }
              },
            });
          }
        },
      });
    }
  }

  // auto complete query
  function find_auto_complete_words(keywords) {
    $("#auto_complete_container").html("");
    var keywords = keywords;
    $.ajax({
      type: "POST",
      url: rootUrl + "Frontend/search_api_auto_complete",
      data: {
        keywords: keywords,
      },
      success: function (data) {
        var json = $.parseJSON(data);
        var values = json.values;

        $("#auto_complete_container").html("");
        values.forEach(function (value) {
          var auto_complete_block =
            '<div class="auto_complete_result pointer"><div class="auto_complete_keywords">' +
            translate_this(van_fix(value)) +
            '</div><img src="' +
            rootUrl +
            'items/frontend/img/search_icon_black.svg" alt=""></div>';
          $("#auto_complete_container").append(auto_complete_block);
        });
        // fix for <<van>>
        function van_fix(str) {
          var map = {
            "<<": "&lt;&lt;",
            ">>": "&gt;&gt;",
          };

          return str.replace("<<", "&lt;&lt;").replace(">>", "&gt;&gt;");
        }
      },
    });
  }
}
