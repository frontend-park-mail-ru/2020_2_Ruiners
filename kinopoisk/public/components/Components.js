    function createA(href, text) {
        const a = document.createElement('a');
        a.href = href;
        a.textContent = text;
        return a;
    }

    function createSpan(classname, text) {
        const span = document.createElement('span');
        span.className = classname;
        span.textContent = text;
        return span;
    }

    function createInput(type, name, text) {
        const input = document.createElement('input');
        input.type = type;
        input.name = name;
        input.placeholder = text;
        return input;
    }

    function createInputSubmit(value, className) {
        const input = document.createElement('input');
        input.type = 'submit';
        input.className = className;
        input.value = value;
        return input;
    }

    function createDiv(cla, child) {
        const div = document.createElement('div');
        div.className = cla;

        child.appendChild(div);
        return div;
    }

    function createLi(className, child) {
        const li = document.createElement('li');
        li.className = className;
        li.appendChild(child);
        return li;
    }
