---
layout: post
title: Switching Between Jekyll Themes
tags: webdevelopment
author: Emmanuel Menon
lang: en_AU
sitemap:
  lastmod: 2019-05-30
---
Last night, I decided to switch Jekyll themes. The previous one didn't look that great and there was an extremely weird bug (which I couldn't fix). This bug essentially made it so that the entire site would appear to be normal, ***EXCEPT FOR ABOUT HALF A MONITOR'S WORTH OF WHITESPACE*** on the right side. This pissed me off to such an extent that I just decided to switch to another theme. After checking out some [themes](https://jekyllthemes.io/free), I finally picked [Hyde](https://hyde.getpoole.com). Hyde looked great, was (relatively) minimalistic and seemed easily configurable which suits my needs perfectly.
<!--more-->
So, I headed to the GitHub repo for Hyde, downloaded it to my hard drive and unzipped it. After unzipping it, I decided to quickly run `jekyll serve` in CMD to check out the themes default state. I was greeted with this.

![Jekyll Build Fail #1...of many](https://i.lensdump.com/i/WetOzo.jpg)

Easy enough fix right?

Yes, but answer me this. Who **CHOOSES** not to include a Gemfile in their theme? And **WHY**?

After adding

```ruby
gem: [jekyll-paginate, jekyll-github-metadata]
plugins: [jekyll-paginate]
```
to the top of my _config.yml file, I was greeted by another error.

![Jekyll Build Fail #2...of many](https://i.lensdump.com/i/Wetz12.jpg)

Now I was beginning to wonder whether the creators of this theme actually tested their theme before uploading it to GitHub. So I went back to the repo. While browsing through the files I saw this:

![Latest Commit?](https://i.lensdump.com/i/WetefC.jpg)
**THE LAST COMMIT HAD BEEN MADE ABOUT 4 YEARS AGO!**

I decided to persist in the face of adversity. Having a quick look at the config.yml, I commented out `relative_permalinks: true` since it looked like it was the source of the problem. I headed back to CMD, ran `jekyll serve` once more, and...

![Jekyll Build Fail #3... of many](https://i.lensdump.com/i/WetSKv.jpg)

Looking at line 49 of the offending Markdown file (you can look at it [here](https://github.com/poole/hyde/blob/master/_posts/2012-02-07-example-content.md)), I was unable to find anything that would have caused this error. I CTRL-F'ed "gist" and found the source of the error. It turns out that in the gems listed at the top of my config.yml file, I had not included `jekyll-gist` (this could've been avoided if the developers had included the gem in the first place). I ran it again and was hit with the exact same error. At this point, I almost broke. I just decided to delete the markdown file that was causing the problem and get on with my life.

I typed in `jekyll serve` into CMD. I closed my eyes and pressed enter. After waiting twenty seconds, I tentatively opened my eyes. It was working!

![It's working!](https://i.lensdump.com/i/WetHw9.png)

After adding in the info I wanted to add to the site (and adding two blog posts), I pushed it to GitHub. Checking out the homepage on the site, everything seemed great. I left my site alone and started playing Planescape: Torment. Just before heading to bed, I decided to check the site out on my phone. Mobile version of the homepage loaded up fine. I clicked on the link to the About page, and was faced with an unstyled monstrosity of a webpage!

No sleep for me I guess...

Logging back on to my computer, I noted that the locally hosted site was working properly. However, testing the GitHub Pages hosted site yielded the same error that had occured on my phone. A quick view-source showed me that the site wasn't linking to the correct base URL for the site. Now, I'm not exactly that experienced with using Jekyll (or even HTML for that matter) so I had no idea why this issue was only reproducible on the GitHub pages site. So I Googled it and found [this](https://github.com/poole/hyde/issues/54).

![Arghh!!](https://i.lensdump.com/i/Wetvj5.jpg)

I hadn't even noticed the baseurl variable in config.yml. Since I couldn't reproduce this issue locally, I had to commit to the repo **THREE** times before the site started working. I tried changing baseurl from `\hyde` to `\` to `/` and finally to ` `. You can almost feel me beginning to lose hope in the last commit message (It was 10:30 PM and I had been working on the site for 4+ hours).

When I finally got it fixed, I jumped out of my seat, ran out of the house into the freezing cold and ran straight back in.

<i>Edit: I've since switched again, this time to a [Solar Theme](https://github.com/mattvh/solar-theme-jekyll). Luckily, it didn't take as much work to set it up this time, although since it is quite old, I had to update a bunch of stuff and hack in some of the features I need.</i>
