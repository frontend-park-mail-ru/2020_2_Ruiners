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
            var alias1=container.lambda, alias2=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
                if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
                    return parent[propertyName];
                }
                return undefined
            };

            return "                        <a href=\"genre/"
                + alias2(alias1((depth0 != null ? lookupProperty(depth0,"genre") : depth0), depth0))
                + "\" class=\"link\"> "
                + alias2(alias1((depth0 != null ? lookupProperty(depth0,"rusGenre") : depth0), depth0))
                + " </a>\n";
        },"3":function(container,depth0,helpers,partials,data) {
            var alias1=container.lambda, alias2=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
                if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
                    return parent[propertyName];
                }
                return undefined
            };

            return "                        <a href=\"person/"
                + alias2(alias1((depth0 != null ? lookupProperty(depth0,"Id") : depth0), depth0))
                + "\" class=\"link\">"
                + alias2(alias1((depth0 != null ? lookupProperty(depth0,"Name") : depth0), depth0))
                + " </a>\n";
        },"5":function(container,depth0,helpers,partials,data) {
            return "                    "
                + container.escapeExpression(container.lambda(depth0, depth0))
                + ",\n";
        },"7":function(container,depth0,helpers,partials,data) {
            var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), lookupProperty = container.lookupProperty || function(parent, propertyName) {
                if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
                    return parent[propertyName];
                }
                return undefined
            };

            return "                <div class=\"rating-area\">\n"
                + ((stack1 = lookupProperty(helpers,"each").call(alias1,(depth0 != null ? lookupProperty(depth0,"stars") : depth0),{"name":"each","hash":{},"fn":container.program(8, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":35,"column":20},"end":{"line":38,"column":29}}})) != null ? stack1 : "")
                + "                </div>\n                "
                + ((stack1 = ((helper = (helper = lookupProperty(helpers,"Button") || (depth0 != null ? lookupProperty(depth0,"Button") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(alias1,{"name":"Button","hash":{},"data":data,"loc":{"start":{"line":40,"column":16},"end":{"line":40,"column":30}}}) : helper))) != null ? stack1 : "")
                + "\n";
        },"8":function(container,depth0,helpers,partials,data) {
            var alias1=container.lambda, alias2=container.escapeExpression;

            return "                        <input type=\"radio\" id=\"star-"
                + alias2(alias1(depth0, depth0))
                + "\" name=\"rating\" value=\""
                + alias2(alias1(depth0, depth0))
                + "\">\n                        <label for=\"star-"
                + alias2(alias1(depth0, depth0))
                + "\" title=\"Оценка «"
                + alias2(alias1(depth0, depth0))
                + "»\"></label>\n";
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
                + " голосов</span></div>\n        </div>\n        <div class=\"right-block\">\n            <div class=\"desc\">\n                "
                + alias4(((helper = (helper = lookupProperty(helpers,"description") || (depth0 != null ? lookupProperty(depth0,"description") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"description","hash":{},"data":data,"loc":{"start":{"line":14,"column":16},"end":{"line":14,"column":33}}}) : helper)))
                + "\n            </div>\n            <div class=\"desc info\">\n                <div>\n                    <b>Жанр:</b>\n"
                + ((stack1 = lookupProperty(helpers,"each").call(alias1,(depth0 != null ? lookupProperty(depth0,"genres") : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":19,"column":20},"end":{"line":21,"column":29}}})) != null ? stack1 : "")
                + "                </div>\n                <div class=\"roles\">\n                    <b>В ролях:</b>\n"
                + ((stack1 = lookupProperty(helpers,"each").call(alias1,(depth0 != null ? lookupProperty(depth0,"actors") : depth0),{"name":"each","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":25,"column":20},"end":{"line":27,"column":29}}})) != null ? stack1 : "")
                + "                </div>\n"
                + ((stack1 = lookupProperty(helpers,"each").call(alias1,(depth0 != null ? lookupProperty(depth0,"countries") : depth0),{"name":"each","hash":{},"fn":container.program(5, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":29,"column":16},"end":{"line":31,"column":25}}})) != null ? stack1 : "")
                + "            </div>\n"
                + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"isAuth") : depth0),{"name":"if","hash":{},"fn":container.program(7, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":33,"column":12},"end":{"line":41,"column":19}}})) != null ? stack1 : "")
                + "        </div>\n    </div>\n</div>";
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
            var stack1, helper, lookupProperty = container.lookupProperty || function(parent, propertyName) {
                if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
                    return parent[propertyName];
                }
                return undefined
            };

            return "    <h1 class=\"myComment__header\">Ваш отзыв</h1>\n    <div class=\"myComment__underground\">\n        <form>\n            <textarea name=\"message\" rows=\"1\" class=\"question\" required=\"\" autocomplete=\"off\" id=\"msg\"></textarea>\n            <label class=\"comment\" for=\"msg\"><span class=\"comment\">Напишите отзыв..</span></label>\n        </form>\n        "
                + ((stack1 = ((helper = (helper = lookupProperty(helpers,"Button") || (depth0 != null ? lookupProperty(depth0,"Button") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"Button","hash":{},"data":data,"loc":{"start":{"line":8,"column":8},"end":{"line":8,"column":22}}}) : helper))) != null ? stack1 : "")
                + "\n    </div>\n";
        },"3":function(container,depth0,helpers,partials,data) {
            return "    <h1 class=\"myComment__header\">Нет отзывов</h1>\n";
        },"5":function(container,depth0,helpers,partials,data) {
            var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
                if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
                    return parent[propertyName];
                }
                return undefined
            };

            return "    <h1 class=\"myComment__header\">Все отзывы</h1>\n"
                + ((stack1 = lookupProperty(helpers,"each").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"comments") : depth0),{"name":"each","hash":{},"fn":container.program(6, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":15,"column":4},"end":{"line":27,"column":13}}})) != null ? stack1 : "");
        },"6":function(container,depth0,helpers,partials,data) {
            var alias1=container.lambda, alias2=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
                if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
                    return parent[propertyName];
                }
                return undefined
            };

            return "        <div class=\"myComment__underground\">\n            <a class=\"profile__comment\" href=\"\">\n                <span class=\"login__comment\">"
                + alias2(alias1((depth0 != null ? lookupProperty(depth0,"UserLogin") : depth0), depth0))
                + "</span>\n                <img class=\"profile__round\" width=\"50\" height=\"50\" src=\""
                + alias2(alias1((depth0 != null ? lookupProperty(depth0,"Image") : depth0), depth0))
                + "\" alt=\"\">\n            </a>\n            <div class=\"comment__content\">\n                "
                + alias2(alias1((depth0 != null ? lookupProperty(depth0,"TextBody") : depth0), depth0))
                + "\n            </div>\n            <hr class=\"myLine\">\n            <span class=\"comment__rate\">Оценка: "
                + alias2(alias1((depth0 != null ? lookupProperty(depth0,"Rate") : depth0), depth0))
                + "/10</span>\n        </div>\n";
        },"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
            var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), lookupProperty = container.lookupProperty || function(parent, propertyName) {
                if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
                    return parent[propertyName];
                }
                return undefined
            };

            return ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"isAuth") : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":1,"column":0},"end":{"line":10,"column":7}}})) != null ? stack1 : "")
                + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"noComments") : depth0),{"name":"if","hash":{},"fn":container.program(3, data, 0),"inverse":container.program(5, data, 0),"data":data,"loc":{"start":{"line":11,"column":0},"end":{"line":28,"column":7}}})) != null ? stack1 : "");
        },"useData":true});
})();




(function() {
    var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
    templates['PersonCard'] = template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
            var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
                if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
                    return parent[propertyName];
                }
                return undefined
            };

            return "<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n    <meta charset=\"UTF-8\">\n    <link rel=\"stylesheet\" href=\"../../Actor.css\">\n    <title>Title</title>\n</head>\n<body>\n<div class=\"actor__main\">\n    <div>\n        <img width=\"250\", height=\"300\" src=\""
                + alias4(((helper = (helper = lookupProperty(helpers,"Image") || (depth0 != null ? lookupProperty(depth0,"Image") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"Image","hash":{},"data":data,"loc":{"start":{"line":11,"column":44},"end":{"line":11,"column":53}}}) : helper)))
                + "\" class=\"person__image\">\n    </div>\n    <div class=\"person__info\">\n        <div class=\"person__name\">\n            "
                + alias4(((helper = (helper = lookupProperty(helpers,"Name") || (depth0 != null ? lookupProperty(depth0,"Name") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"Name","hash":{},"data":data,"loc":{"start":{"line":15,"column":12},"end":{"line":15,"column":20}}}) : helper)))
                + "\n        </div>\n        <div class=\"person__date\">\n            <span class=\"person__headers\">Дата рождения:</span>"
                + alias4(((helper = (helper = lookupProperty(helpers,"BornDate") || (depth0 != null ? lookupProperty(depth0,"BornDate") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"BornDate","hash":{},"data":data,"loc":{"start":{"line":18,"column":63},"end":{"line":18,"column":75}}}) : helper)))
                + "\n        </div>\n        <div class=\"person__date\">\n            <span class=\"person__headers\">Место рождения:</span>"
                + alias4(((helper = (helper = lookupProperty(helpers,"BornPlace") || (depth0 != null ? lookupProperty(depth0,"BornPlace") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"BornPlace","hash":{},"data":data,"loc":{"start":{"line":21,"column":64},"end":{"line":21,"column":77}}}) : helper)))
                + "\n        </div>\n    </div>\n</div>\n</body>\n</html>";
        },"useData":true});
})();