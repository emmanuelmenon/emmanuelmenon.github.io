---
layout: post
title: Setting Up a Tagging System for a Jekyll Blog
tags: webdevelopment
author: Emmanuel Menon
lang: en_AU
sitemap:
  lastmod: 2019-06-04
---
After doing the initial setup for my GitHub Pages hosted site (which I have detailed [here]({{ site.baseurl }}{% post_url 2019-05-30-painful-setup %})), I decided to add a tagging system to my site. How hard can it be? I asked myself. Turns out it isn't very hard at all (especially when compared to setting up Hyde for Jekyll).
<!--more-->
Now, I'm not the greatest at web development. So the first thing I did was hit up [Google](https://www.google.com/search?q=how+to+tag+blog+posts+in+jekyll&oq=how+to+tag+blog+posts+in+jekyll). The first link, [Jekyll Documentation](https://jekyllrb.com/docs/posts/), was extremely useful.

Adding tags to a Jekyll post is easy. All you have to do is place this at the top of your markdown file:
```ruby
---
layout: whatever-your-post-layout-is
title: whatever-your-title-is
tags: tag1 tag2 tag3
---
```

Displaying those tags at the bottom of your page is also extremely easy. In your post layout, paste this at the bottom of the file.
```
<h6>
    tags:
    <<% for tag in page.tags %>>
    <a href="<< site.baseurl >>/tags/<< tag >>/">
        #<< tag >>
    </a>
    <<% endfor %>>
</h6>
```
> Note: In the above code, you will have to switch out `<<` for `two left curly braces` and `>>` for `two right curly braces` (within the for loop). For the actual for loop, `<<` needs to be replaced with a single `left curly brace` while `>>` needs to be replaced with a `right curly brace`. Apologies for the inconvenience but Jekyll wasn't letting me use curly braces.

All I am doing in the above code is specifying what size the tags will be, iterating through them and displaying them on the site.

While the above is extremely simple, grouping posts that have similar tags is much harder. The code I found on [this site](https://dev.to/rpalo/jekyll-tags-the-easy-way) makes it much easier to do so. This code needs to be placed in `_layouts/tagpage.html`.
```
---
layout: whatever-your-default-layout-is
---
<h1>#<< page.tag >></h1>

<ul>
    <<% for post in site.tags[page.tag] %>>
    <li>
        << post.date | date: "%B %d, %Y" >>:
            <a href="<< post.url >>">
                << post.title >>
            </a>
    </li>
    <<% endfor %>>
</ul>
```
> Note: In the above code, you will have to switch out `<<` for `two left curly braces` and `>>` for `two right curly braces` (within the for loop). For the actual for loop, `<<` needs to be replaced with a single `left curly brace` while `>>` needs to be replaced with a `right curly brace`. Apologies for the inconvenience but Jekyll wasn't letting me use curly braces.

This layout is applied to the tags that we make next. All it does is iterate through each post that has the tag that the tagpage is allocated to and prints the post in chronological order.

Next, create a `tags` directory in your root folder. In the directory, create a markdown file named `whatever-your-tag-is`(in this example case it would be named tag1) that contains this code:
```ruby
---
layout: tagpage
tag: tag1
permalink: /tags/tag1/
---
```
This code is to be placed at the top of each tagpage. It specifies a layout and the tag that the page is allocated to. If pretty permalinks are turned on, then this page will also allocate itself a permalink.

You will have to create this file for each tag that is used in your blog. Although this is kinda messy, it works. To echo the words of one of my friends:
> *"If it ain't broke, don't fix it."*
