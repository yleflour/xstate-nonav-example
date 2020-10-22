# XState-NoNav Example App

> If you have feedbacks, please leave a comment in [this issue thread](https://github.com/yleflour/xstate-nonav-example/issues/1). I would love to have other points of view on this topic.

This is a sample app demonstrating a way of orchestrating the xstate Library with react-nonav.

You can find out more on [https://joyto.dev/xstate-nonav/](https://joyto.dev/xstate-nonav/)

## Try it

Download the app with Expo on your phone [https://expo.io/@yleflour/projects/xstate-nonav-example](https://expo.io/@yleflour/projects/xstate-nonav-example)

## Setup

**Prerequisites:** Have [expo](https://expo.io/learn) installed

**To run it:**

```
git clone git@github.com:yleflour/xstate-nonav-example.git
cd xstate-nonav-example
yarn
yarn start
```

## What you can do

- Basic navigation
- Disconnecting from the internet
  - If playing a video that's not in downloads, the player will close
  - If you are in the "Home" tab, it will redirect to the "Downloads" tab

## Notes

- This example is based on the [react-nonav example](https://github.com/tpucci/react-nonav/tree/master/example), transformed to run with xstate instead of mobx
- This example does not claim to be a definitive way of architecturing your app but it's a first step in how to integrate both libraries

## Next steps toward a better architecture

- As you can see the entire state machine is inside a single file `module/root.machine.ts` because it's based on pre-existing code.
  - This is an issue because it replicates existing navigation patterns [as explained in my talk](https://joyto.dev/xstate-nonav/)
  - A next step for refactoring it would be to split it between components by instanciating separate machines arround them instead of everything from root.
- In Redux, it is recommended to use `selectors` to access data and `actionCreators` to compute the events to be sent. The same logic should be applied here.
- I will keep on adding more as I get [feedback](https://github.com/yleflour/xstate-nonav-example/issues/1)
