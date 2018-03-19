Основная статья S1
https://www.valentinog.com/blog/webpack-4-tutorial/

Вспомогательная статья S2
https://www.robinwieruch.de/minimal-react-webpack-babel-setup/#babel-react-setup
    
## Примечания к статье:

    S1: в разделе "webpack 4: setting up webpack 4 with React" нужно дополнительно добавить секцию 
    ```json
        "babel": {
            "presets": [
                "env",
                "react",
                "stage-2"
            ]
        },
    ```
    на первый уровень package.json

    https://stackoverflow.com/questions/33527653/babel-6-regeneratorruntime-is-not-defined
    настройка полифила для корректной работы с async в webpack