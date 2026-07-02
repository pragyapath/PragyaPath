# Animation System Guide

## Available Animation Classes

### 🎬 Scroll Reveal Animations

#### `.fade-up`
Fades in and slides up when element enters viewport
```html
<div class="fade-up">Content reveals on scroll</div>
```

#### `.fade-up.delay-2`
Same as fade-up but with 0.2s delay
```html
<div class="fade-up delay-2">Delayed reveal</div>
```

#### `.hero-reveal`
Immediate fade-in animation for hero sections
```html
<div class="hero-reveal">Hero content</div>
```

#### `.stagger-child`
For parent containers - children animate sequentially
```html
<div class="stagger-parent">
  <div class="stagger-child">Item 1</div>
  <div class="stagger-child">Item 2</div>
  <div class="stagger-child">Item 3</div>
</div>
```

---

### 🖼️ Image Hover Effects

#### `.img-hover`
Smooth zoom + gold glow overlay
```html
<div class="img-hover">
  <img src="photo.jpg" alt="...">
</div>
```

**Effect:**
- Image scales to 1.08x
- Gold radial glow appears
- 0.7s smooth transition
- Filter brightness increases

---

### 🎴 Card Animations

#### `.service-card`
Lifts up and scales on hover
```html
<div class="service-card">
  <!-- Card content -->
</div>
```

**Effect:**
- Translates up 8px
- Scales to 1.02x
- Shadow increases
- 0.5s smooth transition

---

### 🔘 Button Animations

#### `.btn-primary`
Premium button with lift + glow
```html
<button class="btn-primary">
  Click Me
</button>
```

**Effect:**
- Lifts up 2px
- Scales to 1.02x
- Gold shadow glow
- 0.4s transition

#### `.btn-ghost`
Minimal button with slide effect
```html
<a href="#" class="btn-ghost">
  Learn More →
</a>
```

**Effect:**
- Slides right 4px
- 0.3s transition

---

### 👥 Team Card Effects

#### `.team-card .team-avatar`
Avatar scales and rotates
```html
<div class="team-card">
  <div class="team-avatar">
    <span>AD</span>
  </div>
  <h4>Name</h4>
</div>
```

**Effect:**
- Avatar scales to 1.1x
- Rotates 5 degrees
- 0.5s smooth transition

---

### 📋 Form Animations

#### `.form-input`
Input fields lift on focus
```html
<input type="text" class="form-input" placeholder="Name">
```

**Effect:**
- Lifts up 2px on focus
- 0.3s transition

---

### 🖼️ Gallery Effects

#### `.gallery-masonry-item`
Gallery images with enhanced hover
```html
<div class="gallery-masonry-item">
  <img src="photo.jpg" alt="...">
</div>
```

**Effect:**
- Lifts up 6px
- Scales to 1.02x
- Large shadow
- 0.5s transition

---

### 🌐 Social Icon Effects

#### `.social-icon`
3D transform effects for social links
```html
<a href="#" class="social-icon">
  <svg>...</svg>
</a>
```

**Effect:**
- Lifts up 4px
- Rotates 5 degrees
- Scales to 1.08x
- Gold shadow glow
- 0.3s transition

---

## 🎨 Animation Timing

| Duration | Use Case |
|----------|----------|
| 0.3s | Quick interactions (buttons, links) |
| 0.4s | Medium interactions (cards) |
| 0.5s | Larger elements (modals, cards) |
| 0.6s | Stagger children |
| 0.7s | Images, smooth transforms |
| 0.8s | Scroll reveals |

---

## 🚀 Performance Tips

1. **Use GPU acceleration:**
   ```css
   transform: translateZ(0);
   ```

2. **Add will-change hints:**
   ```css
   will-change: transform;
   ```

3. **Avoid animating:**
   - width/height
   - top/left/right/bottom
   - margin/padding

4. **Prefer animating:**
   - transform
   - opacity
   - filter

---

## 🎯 Easing Functions

All animations use `cubic-bezier(0.16, 1, 0.3, 1)` for smooth, natural motion:
- Fast start
- Smooth deceleration
- Natural feel
- No bounce

---

## 📱 Responsive Behavior

All animations work across all screen sizes:
- Desktop: Full effects
- Tablet: Full effects
- Mobile: Full effects (touch-optimized)

---

## 🎭 Custom Animation Example

Want to add your own animation?

```css
.my-custom-animation {
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);
}

.my-custom-animation.active {
  opacity: 1;
  transform: translateY(0);
}
```

Then trigger with JavaScript:
```javascript
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
    }
  });
});

document.querySelectorAll('.my-custom-animation').forEach(el => {
  observer.observe(el);
});
```

---

## 🔍 Debugging Animations

**Animation not working?**

1. Check if element has the class
2. Verify CSS is compiled (`npm run build:css`)
3. Check browser console for errors
4. Ensure JavaScript is loaded
5. Test in different browsers

**Animation too slow/fast?**

Edit `public/css/input.css`:
```css
.fade-up {
  transition: opacity 0.8s; /* Change this number */
}
```

Then rebuild: `npm run build:css`

---

## 🎉 Quick Reference

| Class | Effect | Duration |
|-------|--------|----------|
| `.fade-up` | Fade + slide up | 0.8s |
| `.img-hover` | Zoom + gold glow | 0.7s |
| `.btn-primary` | Lift + glow | 0.4s |
| `.service-card` | Lift + scale | 0.5s |
| `.team-avatar` | Scale + rotate | 0.5s |
| `.social-icon` | 3D transform | 0.3s |
| `.stagger-child` | Sequential fade | 0.6s |

---

**Made with ❤️ for Pragya Path**
