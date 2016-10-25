# niceTour

Step-by-step tour for your website

[![NPM](https://nodei.co/npm/nicetour.png)](https://nodei.co/npm/nicetour/)

```javascript
niceTour.init({
    'steps': [
        {
            'element': '#exampleInputEmail1',
            'title': 'Title 1',
            'content': 'Content 1',
            'position': {
                'my': 'top center',
                'at': 'bottom center'
            }
        },
        {
            'element': '#exampleInputPassword1',
            'title': 'Title 2',
            'content': 'Content 2',
            'position': {
                'my': 'top center',
                'at': 'bottom center'
            }
        },
        {
            'element': '#exampleInputFile',
            'title': 'Title 3',
            'content': 'Content 3',
            'position': {
                'my': 'top left',
                'at': 'bottom left'
            }
        },
        {
            'element': '#checkbox',
            'title': 'Title 4',
            'content': 'Content 4',
            'position': {
                'my': 'top left',
                'at': 'bottom left'
            },
            'next': '#checkbox'
        },
        {
            'element': '#submit',
            'title': 'Title 5',
            'content': 'Content 5',
            'position': {
                'my': 'bottom left',
                'at': 'top center'
            },
            'scroll': true
        }
    ]
});

niceTour.start();
```