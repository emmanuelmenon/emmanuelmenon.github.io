---
layout: default
title: Archived Posts
description: Archived posts from the blog of Emmanuel Menon. Disclaimer - none of these posts will provide enlightenment on any subject. They might however, provide brief entertainment.
---
<div id="search-container" style="width: 100%">
<h1>Search:</h1>
    <input style="width: 100%; height: 32px; border: 1px solid white; border-radius: 10px" type="text" id="search-input" placeholder="good content?">
    <ul style="padding-bottom: 5px" id="results-container"></ul>
</div>
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

<script src="../assets/js/simple-jekyll-search.min.js" type="text/javascript"></script>

<script>
SimpleJekyllSearch({
    searchResultTemplate: '<li style="">{date}: <a href="{url}">{title}</a></li>',
    searchInput: document.getElementById('search-input'),
    resultsContainer: document.getElementById('results-container'),
    limit: 10,
    fuzzy: true,
    noResultsText: 'No results found',
    json: '/search.json'
})
</script>
