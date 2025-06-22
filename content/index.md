---
title: Hello
layout: layouts/base.njk
permalink: "/"
eleventyNavigation:
  key: Hello
  order: 1
---
<section class="intro-block">
  <div class="intro-heading">
    <h1><span class="typewriter">Hi, I'm Ben.</span></h1>
  </div>

  <div class="inline-image">
      <img src="./imgs/BD-sm.JPG" alt="Ben" class="fade-in mobile-fade">
  </div>
  <div class="intro-text">
    <p><i data-lucide="hand"></i> I’m an everything-thinker who finds peace amongst the chaos.
      The best way to think of me? A Swiss Army Knife — because my name’s not Jack.
    </p>
    <p><i data-lucide="brain"></i> My brain wears Nikes, always running. This site’s where I unload thoughts, frameworks, and half-tested ideas—some clean, some messy.</p>
    <p><i data-lucide="help-circle"></i> I'm comfortable wrestling two-truths at once, being uncomfortable is where we grow. I like simplifying complexity and finding out what matters in the noise.</p>

    <p><i data-lucide="box"></i> I think deeply, work hard, and often ask too many questions. I don’t always fit the mould—but I’ve stopped seeing that as <em>my</em> problem.</p>

    <p><i data-lucide="dna"></i> Somewhere along the way, I came to understand that I’m twice-exceptional (2e)—a term for those with both cognitive giftedness and ADHD. It sits under the neurodivergent umbrella, but it’s part of my wiring, not my identity. It helps explain the friction, the intensity, and the weird strengths I bring. More than that, it reminds me that doing things differently isn’t the flaw—it’s the feature.</p>

    <p><i data-lucide="mail"></i> If it clicks, <a href="/contact">say hey</a>. If not, no stress—there’s an <code>X</code> right up there in the corner of your browser.</p>

    <p><i data-lucide="cone-off"></i> Welcome to my sandbox.</p>
  </div>
</section>

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
