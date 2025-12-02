# DuneBox
### Prompt Injection Detection with SLM in Local Sandbox

|Report|Slides|Demo Video|
|--|--|--|
|[Prompt Injection Detection with SLM in Local Sandbox](https://docs.google.com/document/d/19h6LMAs1rnrEPhF2w0cGAoRyJ3udxJ3U7CbaEdmgf80/edit?tab=t.0)|[Slides](https://www.figma.com/deck/uwT3eT5xfLoZ15uJ08zLUv/Dunebox-Slide?node-id=1-42&t=G1MkEuUwahxCvZZu-1)|[Demo Video](https://youtu.be/nEIWe5UqJNM)|
|![report cover](assets/report-cover.png)|![slides cover](assets/slides-cover.png)|![thumbnail](assets/demo-video-thumbnail.png)|

# Quick Start
## Chrome Extension 
```
$nvm use 22
$pnpm install
$pnpm dev
```
and load the unpacked Chrome extension from /dist directory in Chrome

# Test Scenarios
```
$pnpm serve-tests
```
and navigate to http://127.0.0.1:8080 and select a test payload