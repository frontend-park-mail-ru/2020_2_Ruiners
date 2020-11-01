(function() {
    var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
    templates['Button'] = template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
            var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
                if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
                    return parent[propertyName];
                }
                return undefined
            };

            return "<button id=\""
                + alias4(((helper = (helper = lookupProperty(helpers,"id") || (depth0 != null ? lookupProperty(depth0,"id") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data,"loc":{"start":{"line":1,"column":12},"end":{"line":1,"column":18}}}) : helper)))
                + "\" class=\""
                + alias4(((helper = (helper = lookupProperty(helpers,"classname") || (depth0 != null ? lookupProperty(depth0,"classname") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"classname","hash":{},"data":data,"loc":{"start":{"line":1,"column":27},"end":{"line":1,"column":42}}}) : helper)))
                + "\" type=\""
                + alias4(((helper = (helper = lookupProperty(helpers,"type") || (depth0 != null ? lookupProperty(depth0,"type") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"type","hash":{},"data":data,"loc":{"start":{"line":1,"column":50},"end":{"line":1,"column":58}}}) : helper)))
                + "\">"
                + alias4(((helper = (helper = lookupProperty(helpers,"text") || (depth0 != null ? lookupProperty(depth0,"text") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"text","hash":{},"data":data,"loc":{"start":{"line":1,"column":60},"end":{"line":1,"column":70}}}) : helper)))
                + "</button>";
        },"useData":true});
})();

(function () {
  const { template } = Handlebars;
  const templates = Handlebars.templates = Handlebars.templates || {};
  templates.Window = template({
    compiler: [8, '>= 4.3.0'],
    main(container, depth0, helpers, partials, data) {
      return '<div class="okno" id="okno">\n</div>';
    },
    useData: true,
  });
}());

(function() {
    var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
    templates['FilmCard'] = template({"1":function(container,depth0,helpers,partials,data) {
            var alias1=container.lambda, alias2=container.escapeExpression;

            return "                    <input type=\"radio\" id=\"star-"
                + alias2(alias1(depth0, depth0))
                + "\" name=\"rating\" value=\""
                + alias2(alias1(depth0, depth0))
                + "\">\n                    <label for=\"star-"
                + alias2(alias1(depth0, depth0))
                + "\" title=\"Оценка «"
                + alias2(alias1(depth0, depth0))
                + "»\"></label>\n";
        },"3":function(container,depth0,helpers,partials,data) {
            return "                        <a href=\"#\" class=\"link\"> "
                + container.escapeExpression(container.lambda(depth0, depth0))
                + " </a>\n";
        },"5":function(container,depth0,helpers,partials,data) {
            return "                        <a href=\"#\" class=\"link\">"
                + container.escapeExpression(container.lambda(depth0, depth0))
                + " </a>\n";
        },"7":function(container,depth0,helpers,partials,data) {
            return "                    "
                + container.escapeExpression(container.lambda(depth0, depth0))
                + ",\n";
        },"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
            var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
                if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
                    return parent[propertyName];
                }
                return undefined
            };

            return "<div class=\"poster\">\n    <div class=\"header\">\n        <a href=\"#\" class=\"header-link\">\n            <b>"
                + alias4(((helper = (helper = lookupProperty(helpers,"title") || (depth0 != null ? lookupProperty(depth0,"title") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"title","hash":{},"data":data,"loc":{"start":{"line":4,"column":15},"end":{"line":4,"column":26}}}) : helper)))
                + "</b>\n        </a>\n    </div>\n    <div class=\"poster-body\">\n        <div class=\"left-block\">\n                <iframe width=\"560\" height=\"315\" src=\""
                + alias4(((helper = (helper = lookupProperty(helpers,"youtube") || (depth0 != null ? lookupProperty(depth0,"youtube") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"youtube","hash":{},"data":data,"loc":{"start":{"line":9,"column":54},"end":{"line":9,"column":67}}}) : helper)))
                + "\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture\" allowfullscreen></iframe>\n            <div> <span class=\"rating\">Рейтинг: "
                + alias4(((helper = (helper = lookupProperty(helpers,"rate") || (depth0 != null ? lookupProperty(depth0,"rate") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"rate","hash":{},"data":data,"loc":{"start":{"line":10,"column":48},"end":{"line":10,"column":58}}}) : helper)))
                + "</span><span class=\"votes\">"
                + alias4(((helper = (helper = lookupProperty(helpers,"votes") || (depth0 != null ? lookupProperty(depth0,"votes") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"votes","hash":{},"data":data,"loc":{"start":{"line":10,"column":85},"end":{"line":10,"column":96}}}) : helper)))
                + " голосов</span></div>\n            <div class=\"rating-area\">\n"
                + ((stack1 = lookupProperty(helpers,"each").call(alias1,(depth0 != null ? lookupProperty(depth0,"stars") : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":12,"column":16},"end":{"line":15,"column":25}}})) != null ? stack1 : "")
                + "            </div>\n            "
                + ((stack1 = ((helper = (helper = lookupProperty(helpers,"Button") || (depth0 != null ? lookupProperty(depth0,"Button") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"Button","hash":{},"data":data,"loc":{"start":{"line":17,"column":12},"end":{"line":17,"column":26}}}) : helper))) != null ? stack1 : "")
                + "\n        </div>\n        <div class=\"right-block\">\n            <div class=\"desc\">\n                "
                + alias4(((helper = (helper = lookupProperty(helpers,"description") || (depth0 != null ? lookupProperty(depth0,"description") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"description","hash":{},"data":data,"loc":{"start":{"line":21,"column":16},"end":{"line":21,"column":33}}}) : helper)))
                + "\n            </div>\n            <div class=\"desc info\">\n                <div>\n                    <b>Жанр:</b>\n"
                + ((stack1 = lookupProperty(helpers,"each").call(alias1,(depth0 != null ? lookupProperty(depth0,"genres") : depth0),{"name":"each","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":26,"column":20},"end":{"line":28,"column":29}}})) != null ? stack1 : "")
                + "                </div>\n                <div class=\"roles\">\n                    <b>В ролях:</b>\n"
                + ((stack1 = lookupProperty(helpers,"each").call(alias1,(depth0 != null ? lookupProperty(depth0,"actors") : depth0),{"name":"each","hash":{},"fn":container.program(5, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":32,"column":20},"end":{"line":34,"column":29}}})) != null ? stack1 : "")
                + "                </div>\n"
                + ((stack1 = lookupProperty(helpers,"each").call(alias1,(depth0 != null ? lookupProperty(depth0,"countries") : depth0),{"name":"each","hash":{},"fn":container.program(7, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":36,"column":16},"end":{"line":38,"column":25}}})) != null ? stack1 : "")
                + "            </div>\n        </div>\n    </div>\n</div>";
        },"useData":true});
})();

(function() {
    var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
    templates['FilmPoster'] = template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
            var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
                if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
                    return parent[propertyName];
                }
                return undefined
            };

            return "<div class=\"lenta__object\">\n    <a href=\"film/"
                + alias4(((helper = (helper = lookupProperty(helpers,"id") || (depth0 != null ? lookupProperty(depth0,"id") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data,"loc":{"start":{"line":2,"column":18},"end":{"line":2,"column":26}}}) : helper)))
                + "\" class=\"href\" id=\""
                + alias4(((helper = (helper = lookupProperty(helpers,"id") || (depth0 != null ? lookupProperty(depth0,"id") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data,"loc":{"start":{"line":2,"column":45},"end":{"line":2,"column":53}}}) : helper)))
                + "\"><img width=\"270\" height=\"420\" src=\""
                + alias4(((helper = (helper = lookupProperty(helpers,"SmallImg") || (depth0 != null ? lookupProperty(depth0,"SmallImg") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"SmallImg","hash":{},"data":data,"loc":{"start":{"line":2,"column":90},"end":{"line":2,"column":104}}}) : helper)))
                + "\" alt=\"\" class=\"object__image\">\n        <div class=\"object__hidden\"><span>"
                + alias4(((helper = (helper = lookupProperty(helpers,"MainGenre") || (depth0 != null ? lookupProperty(depth0,"MainGenre") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"MainGenre","hash":{},"data":data,"loc":{"start":{"line":3,"column":42},"end":{"line":3,"column":57}}}) : helper)))
                + ", "
                + alias4(((helper = (helper = lookupProperty(helpers,"year") || (depth0 != null ? lookupProperty(depth0,"year") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"year","hash":{},"data":data,"loc":{"start":{"line":3,"column":59},"end":{"line":3,"column":69}}}) : helper)))
                + " год</span></div>\n    </a>\n    <div class=\"image__text\"> "
                + alias4(((helper = (helper = lookupProperty(helpers,"title") || (depth0 != null ? lookupProperty(depth0,"title") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"title","hash":{},"data":data,"loc":{"start":{"line":5,"column":30},"end":{"line":5,"column":41}}}) : helper)))
                + " </div>\n</div>";
        },"useData":true});
})();

(function () {
  const { template } = Handlebars;
  const templates = Handlebars.templates = Handlebars.templates || {};
  templates.FilmLenta = template({
    1(container, depth0, helpers, partials, data) {
      let stack1;

      return `        ${
        (stack1 = container.lambda(depth0, depth0)) != null ? stack1 : ''
      }\n`;
    },
    compiler: [8, '>= 4.3.0'],
    main(container, depth0, helpers, partials, data) {
      let stack1; let helper; const alias1 = depth0 != null ? depth0 : (container.nullContext || {}); const
        lookupProperty = container.lookupProperty || function (parent, propertyName) {
          if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
            return parent[propertyName];
          }
          return undefined;
        };

      return `<h1 class="main__header">${
        container.escapeExpression(((helper = (helper = lookupProperty(helpers, 'genre') || (depth0 != null ? lookupProperty(depth0, 'genre') : depth0)) != null ? helper : container.hooks.helperMissing), (typeof helper === 'function' ? helper.call(alias1, {
          name: 'genre', hash: {}, data, loc: { start: { line: 1, column: 25 }, end: { line: 1, column: 36 } },
        }) : helper)))
      }</h1>\n<div class="header__lenta">\n${
        (stack1 = lookupProperty(helpers, 'each').call(alias1, (depth0 != null ? lookupProperty(depth0, 'posters') : depth0), {
          name: 'each', hash: {}, fn: container.program(1, data, 0), inverse: container.noop, data, loc: { start: { line: 3, column: 4 }, end: { line: 5, column: 13 } },
        })) != null ? stack1 : ''
      }</div>`;
    },
    useData: true,
  });
}());


(function() {
    var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
    templates['Footer'] = template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
            return "<footer id=\"footer\" class=\"custom__footer\">\n    <div class=\"footer__text\">By Ruiners: Kinopark 2020 </div>\n</footer>";
        },"useData":true});
})();

(function() {
    var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
    templates['Comments'] = template({"1":function(container,depth0,helpers,partials,data) {
            var alias1=container.lambda, alias2=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
                if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
                    return parent[propertyName];
                }
                return undefined
            };

            return "    <div class=\"myComment__underground\">\n        <a class=\"profile__comment\" href=\"\">\n            <span class=\"login__comment\">"
                + alias2(alias1((depth0 != null ? lookupProperty(depth0,"login") : depth0), depth0))
                + "</span>\n            <img class=\"profile__round\" width=\"50\" height=\"50\" src=\""
                + alias2(alias1((depth0 != null ? lookupProperty(depth0,"image") : depth0), depth0))
                + "\" alt=\"\">\n        </a>\n        <div class=\"comment__content\">\n            "
                + alias2(alias1((depth0 != null ? lookupProperty(depth0,"content") : depth0), depth0))
                + "\n        </div>\n        <hr class=\"myLine\">\n        <span class=\"comment__rate\">Оценка: "
                + alias2(alias1((depth0 != null ? lookupProperty(depth0,"rate") : depth0), depth0))
                + "/10</span>\n    </div>\n";
        },"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
            var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), lookupProperty = container.lookupProperty || function(parent, propertyName) {
                if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
                    return parent[propertyName];
                }
                return undefined
            };

            return "<h1 class=\"myComment__header\">Ваш отзыв</h1>\n<div class=\"myComment__underground\">\n    <form>\n        <textarea name=\"message\" rows=\"1\" class=\"question\" id=\"msg\" required=\"\" autocomplete=\"off\" id=\"comment\"></textarea>\n        <label class=\"comment\" for=\"msg\"><span class=\"comment\">Напишите отзыв..</span></label>\n    </form>\n    "
                + ((stack1 = ((helper = (helper = lookupProperty(helpers,"Button") || (depth0 != null ? lookupProperty(depth0,"Button") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(alias1,{"name":"Button","hash":{},"data":data,"loc":{"start":{"line":7,"column":4},"end":{"line":7,"column":18}}}) : helper))) != null ? stack1 : "")
                + "\n</div>\n<h1 class=\"myComment__header\">Все отзывы</h1>\n"
                + ((stack1 = lookupProperty(helpers,"each").call(alias1,(depth0 != null ? lookupProperty(depth0,"comments") : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":10,"column":0},"end":{"line":22,"column":9}}})) != null ? stack1 : "");
        },"useData":true});
})();