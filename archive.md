---
layout: default
title: Archived Posts
description: Archived posts from the blog of Emmanuel Menon. Disclaimer - none of these posts will provide enlightenment on any subject. They might however, provide brief entertainment.
---
<h1>Browse:</h1>
<ul style="line-height: 2;">
    {% for post in site.posts %}
        <li>{{ post.date | date: "%B %d, %Y" }}: <a href="{{ post.url }}">{{ post.title }}</a></li>
    {% endfor %}
</ul>