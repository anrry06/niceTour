var niceTour = {
    'steps': [],
    'apis': [],
    'cleanedSteps': [],
    'defaultStep': {
        'element': null,
        'title': null,
        'content': null,
        'buttons': {
            'enable': true,
            'previous': 'Prev',
            'next': 'Next',
            'end': 'End'
        },
        'position': {
            'my': 'top left',  // Position my top left...
            'at': 'bottom right', // at the bottom right of... 
        },
        'next': null,
        'scroll': true
    },
    'template': {
        'content': '<span style="width:100%; display:block">{CONTENT}</span>',
        'buttons': '<span style="width:100%; display:block; text-align:right">{CONTENT}</span>',
        'button': '<button class="niceTour-{CLASS}">{CONTENT}</button>'
    },
    'onEnd': function(){},
    'currentIndex': 0,
    
    'init': function init(options) {
        for (var k in options) {
            if (this[k]) {
                this[k] = options[k];
            }
        }
    },

    'start': function start() {
        // for(var i = 0, l = this.steps.length; i < l; i++){
        //     this.displayStep(i);
        // }
        this.displayStep(0);
    },

    'displayStep': function displayStep(index) {
        if(index > this.steps.length - 1){
            return;
        }
        var step = this.steps[index];
        for (var k in this.defaultStep) {
            if (typeof step[k] == 'undefined') {
                step[k] = this.defaultStep[k];
            }
        }
        step.visible = index == 0;
        
        this.cleanedSteps.push(step);

        var tip = $(step.element).qtip({ 
            content: {
                title: step.title,
                text: this.buildTemplate(step, index)
            },
            show: {
                ready: index == 0,
                event: false
            },
            hide: {
                event: false
            },
            style: {
                classes: 'qtip-blue qtip-shadow qtip-bootstrap'
            },
            position: {
                my: step.position.my,
                at: step.position.at
            },
            events: {
                render: function(event, api) {
                    api.tooltip.find('.niceTour-end').click(function(e) {
                        e.preventDefault();
                        niceTour.end();
                    });
                    api.tooltip.find('.niceTour-previous').click(function(e) {
                        e.preventDefault();
                        niceTour.goBack();
                    });
                    api.tooltip.find('.niceTour-next').click(function(e) {
                        e.preventDefault();
                        niceTour.goNext();
                    });
                    
                    
                },
                show: function(event, api) { 
                    var _elem = $(niceTour.cleanedSteps[niceTour.currentIndex].element);
                    
                    if(niceTour.isScrolledIntoView(_elem) === false){
                        console.log(niceTour.cleanedSteps[niceTour.currentIndex]);
                        $(window).scrollTop(_elem.offset().top);
                    }
                    
                    if(niceTour.cleanedSteps[niceTour.currentIndex].next){
                        _elem.unbind('click').click(function(e) {
                            niceTour.goNext();
                        })
                    }
                    
                },
                hide: function(event, api) { 
                    var _elem = $(niceTour.cleanedSteps[niceTour.currentIndex].element);
                    _elem.unbind('click')
                }
            }
        });
        
        this.apis.push(tip.qtip('api'));
        
        this.displayStep(index + 1);
    },
    
    'buildTemplate': function buildTemplate(step, index) {
        var html = '';
        if(step.content){
            html += this.template.content.replace('{CONTENT}', step.content);
        }
        if(step.buttons.enable === true){
            var buttons = '';
            if(index > 0){
                buttons += this.template.button.replace('{CONTENT}', step.buttons.previous).replace('{CLASS}', 'previous');
            }
            if(index < this.steps.length - 1){
                buttons += this.template.button.replace('{CONTENT}', step.buttons.next).replace('{CLASS}', 'next');
            }
            buttons += this.template.button.replace('{CONTENT}', step.buttons.end).replace('{CLASS}', 'end');
            html += this.template.buttons.replace('{CONTENT}', buttons)
        }
        return html;
    },
    
    'goNext': function goNext() {
        if(this.currentIndex < this.steps.length - 1){
            this.apis[this.currentIndex].toggle(false);
            this.cleanedSteps[this.currentIndex].visible = false;
            this.currentIndex++;
            this.apis[this.currentIndex].toggle(true);
            this.cleanedSteps[this.currentIndex].visible = true;
        }
    },
    
    'goBack': function goBack() {
        if(this.currentIndex > 0){
            this.apis[this.currentIndex].toggle(false);
            this.cleanedSteps[this.currentIndex].visible = false;
            this.currentIndex--;
            this.apis[this.currentIndex].toggle(true);
            this.cleanedSteps[this.currentIndex].visible = true;
        }
    },
    
    'end': function end() {
        this.apis[this.currentIndex].toggle(false);
        this.cleanedSteps[this.currentIndex].visible = false;
        this.currentIndex = 0;
        this.onEnd();
    },
    
    'isScrolledIntoView' :function isScrolledIntoView(elem){
        var $elem = $(elem);
        var $window = $(window);
    
        var docViewTop = $window.scrollTop();
        var docViewBottom = docViewTop + $window.height();
    
        var elemTop = $elem.offset().top;
        var elemBottom = elemTop + $elem.height();
    
        return ((elemBottom <= docViewBottom) && (elemTop >= docViewTop));
    }
};