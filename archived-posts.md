---
layout: default
title: Archived Posts
description: Archived posts from the blog of Emmanuel Menon. Disclaimer - none of these posts will provide enlightenment on any subject. They might however, provide brief entertainment.
---
<hr>
<div id="blog-archives">
    <h1>Browse:</h1>
    {% for post in site.posts %}
    <article class="post">
        {% if post.external-url %}
        <ul>
					<li>
					<a href="{{ post.external-url }}">{{ post.title }}</a>
					</li>
				</ul> {% else %}
        <ul><li>{{ post.date | date: "%B %d, %Y" }}: <a href="{{ post.url }}">{{ post.title }}</a></li></ul> {% endif %}
    </article>
    {% endfor %}
</div>
