---
label: Home
icon: home
---

# Welcome to Aseen

If you're looking to get started, jump to Quickstart!
[!ref icon="rocket" text="Quickstart"](quickstart.md)

## What is Aseen?

Aseen is an app that automates the analysis of mouse behavioural videos. You simply select the video you want to analyze and specify where the important regions of the video are, and then Aseen will handle the rest. The output contains the critical numbers that normally would have required watching the entire video with a stopwatch and spreadsheet.

## Why was Aseen created?

Aseen was created to make mouse behavioural analysis fast, reproducible, and accessible to everyone.

Aseen is easy to install and use, even for non-technical researchers. From the start, we have focused on making the setup process for Aseen as simple as possible. We have used many research software tools that either require hours to setup or require advanced programming experience. We believe that the difficult installation process prevents many researchers from using otherwise very powerful tools.

Aseen is installed just like a normal computer program: by opening the installer. To use Aseen, you just click on the desktop icon. **No command line and no Python environments.** Aseen takes the power of cutting-edge research software and brings it to all researchers.

## How does Aseen work?

Aseen uses deep learning to track mice in videos, and then combines the positions of the mice with the pre-defined spatial regions to provide data such as:

- total time spent in each area
- total time spent interacting with each area
- average movement speed
- total distance travelled

Aseen uses a pretrained <a href="https://github.com/DeepLabCut/DeepLabCut" target="_blank">DeepLabCut</a> model to detect the nose, ears, body, tail, and limbs of mice. The positions of these body parts in every frame of the behaviour video are used to calculate the statistics above.
