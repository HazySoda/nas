<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>{{title}}</title>
  <style>
    body {
      margin: 30px;
      padding: 0;
    }
    a {
      display: block;
      font-size: 16px;
    }
  </style>
</head>
<body>
  {{#each files}}
    <a href="{{../dir}}/{{file}}">【{{icon}}】{{file}}</a>
  {{/each}}
</body>
</html>
