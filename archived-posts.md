---
layout: default
title: Archived Posts
description: Archived posts from the blog of Emmanuel Menon. Disclaimer - none of these posts will provide enlightenment on any subject. They might however, provide brief entertainment.
---
<hr>
<div id="blog-archives">
    <h1>Browse:</h1>
    <ol reversed>
        {% for post in site.posts %}
        <li>
            <article class="post" style="line-height: 2;">
                    {{ post.date | date: "%B %d, %Y" }}: <a href="{{ post.url }}">{{ post.title }}</a>
            </article>
        </li>
        {% endfor %}
    </ol>
</div>
