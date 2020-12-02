---
layout: basepage
title: Archive
---
# Archive
<ul>
{% for post in site.posts %}
    <li>{{ post.date | date: "%B %d, %Y" }} - <a href="{{ post.url }}">{{ post.title }}</a></li>
{% endfor %}
</ul>

*this page is very bare-bones right now, <b>might</b> do a little more work on it soon*
