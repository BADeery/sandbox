---
title: Hello
layout: layouts/base.njk
permalink: "/"
eleventyNavigation:
  key: Hello
  order: 1
---

<div class="l-shape-layout">
  <div class="text-box">
    <h1><span class="typewriter">Hi, I'm Ben.</span></h1>
    <p>I am a person that writes stuff.</p>
    <p>This space continues as the lower part of the “L” around the image.</p>
  </div>
  <div class="image-box">
    <img src="/imgs/BD-sm.jpg" alt="Ben" class="fade-in">
  </div>
</div>

<script>
  document.addEventListener("DOMContentLoaded", function () {
    const img = document.querySelector("img.fade-in");
    if (img) {
      if (img.complete) {
        img.classList.add("loaded");
      } else {
        img.addEventListener("load", () => img.classList.add("loaded"));
      }
    }
  });
</script>
