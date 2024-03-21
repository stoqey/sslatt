import type { PaddingProps } from '@uuixjs/uuixweb-lib';
import { getPaddingStyles, styled, themeTokenRule } from '@uuixjs/uuixweb-lib';
import type { RefObject } from 'react';
import { Component, createRef } from 'react';

export enum GlitchAnimationStep {
  mouseEnter = 'mouse-enter',
  mouseLeave = 'mouse-leave',
  mouseDown = 'mouse-down',
  mouseUp = 'mouse-up',
}

const DURATIONS = {
  [GlitchAnimationStep.mouseEnter]: 150,
  [GlitchAnimationStep.mouseLeave]: 250,
  [GlitchAnimationStep.mouseDown]: 50,
  [GlitchAnimationStep.mouseUp]: 75,
};

const ScLogoContainer = styled.div<PaddingProps>`
  ${getPaddingStyles}
  display: inline-flex;
`;

const ScFigure = styled.figure`
  display: inline-flex;
`;

const ScSvg = styled.svg`
  fill: ${themeTokenRule('color-fill-brand')};
  path {
    fill: ${themeTokenRule('color-fill-brand')};
  }
`;

interface ScEyesProps {
  blinking: boolean;
}

export interface AnimatedGlitchLogoProps extends PaddingProps {
  width?: number;
  height?: number;
}

interface RefMap {
  [key: string]: RefObject<SVGAnimateElement>;
}

type SVGAnimateElement = SVGElement & { beginElement?: () => void };

export interface AnimatedGlitchLogoState extends ScEyesProps {}

export class AnimatedGlitchLogo extends Component<
  AnimatedGlitchLogoProps,
  AnimatedGlitchLogoState
> {
  // eslint-disable-next-line react/state-in-constructor, react/no-unused-state
  public state: AnimatedGlitchLogoState = { blinking: false };

  private timer: number | undefined;

  private animationQueue: GlitchAnimationStep[] = [];

  private svgRef: RefObject<SVGSVGElement> = createRef();

  private bodyRefs: RefMap = {
    [GlitchAnimationStep.mouseEnter]: createRef(),
    [GlitchAnimationStep.mouseLeave]: createRef(),
    [GlitchAnimationStep.mouseDown]: createRef(),
    [GlitchAnimationStep.mouseUp]: createRef(),
  };

  private faceRefs: RefMap = {
    [GlitchAnimationStep.mouseEnter]: createRef(),
    [GlitchAnimationStep.mouseLeave]: createRef(),
    [GlitchAnimationStep.mouseDown]: createRef(),
    [GlitchAnimationStep.mouseUp]: createRef(),
  };

  private eyeRefs: RefMap = {
    [GlitchAnimationStep.mouseEnter]: createRef(),
    [GlitchAnimationStep.mouseLeave]: createRef(),
    [GlitchAnimationStep.mouseDown]: createRef(),
    [GlitchAnimationStep.mouseUp]: createRef(),
  };

  // eslint-disable-next-line react/sort-comp
  public render() {
    // const { mouseDown, mouseUp, mouseEnter, mouseLeave } = GlitchAnimationStep;
    return (
      <ScLogoContainer
        className="tw-animated-glitch-logo"
        padding={this.props.padding}
        onMouseEnter={this.onMouseEnter}
        onMouseLeave={this.onMouseLeave}
        onMouseDown={this.onMouseDown}
        onMouseUp={this.onMouseUp}
      >
        <ScFigure>
          <ScSvg
            ref={this.svgRef}
            overflow="visible"
            width={`${this.props.width || 40}px`}
            height={`${this.props.height || 40}px`}
            version="1.1"
            // viewBox={`0 0 40 40`}
            viewBox="0 0 116 220"
            x="0px"
            y="0px"
          >
            <path d="M67.4667 3.46669C64 8.00002 60 21.0667 57.4667 37.3334C53.3333 62.4 47.6 89.3334 46 91.3334C43.4667 94.2667 38.4 93.7334 36.1333 90.2667C33.0667 85.4667 22 31.6 22 21.3334C22 16.8 17.7333 11.2 13.3333 10.1333C8.26666 8.80002 2.39999 12.4 1.19999 17.6C-0.40001 24.8 0.39999 42.8 3.19999 59.6C13.4667 121.2 13.2 118.267 11.8667 143.733C10.2667 173.2 11.7333 185.333 18 197.2C26.4 213.067 38.2667 220 56.4 220C78 220 88.8 212.933 98.9333 192C108.933 171.467 117.067 137.067 114.8 124.8C113.467 117.733 108.4 112.933 103.067 113.6L99.0667 114.267L100.133 107.467C102.667 91.6 100 84.9333 90.5333 83.2C84.1333 82 81.4667 83.3334 77.8667 89.7334L74.6667 95.3334L74.2667 90.5334C74 88 76.2667 71.2 79.3333 53.3334C85.7333 14.5334 86 7.86668 81.3333 3.33336C76.9333 -1.19998 71.0667 -1.06665 67.4667 3.46669Z" />
          </ScSvg>
        </ScFigure>
      </ScLogoContainer>
    );
  }

  private onMouseEnter = () => {
    // Start this animation immediately in order to provide responsive UX
    this.queueAnimation(GlitchAnimationStep.mouseEnter, true);
  };

  private onMouseLeave = () => {
    this.queueAnimation(GlitchAnimationStep.mouseLeave);
  };

  private onMouseDown = () => {
    // Start this animation immediately in order to provide responsive UX
    this.queueAnimation(GlitchAnimationStep.mouseDown, true);
  };

  private onMouseUp = () => {
    this.queueAnimation(GlitchAnimationStep.mouseUp);
  };

  private queueAnimation(step: GlitchAnimationStep, startNow: boolean = false) {
    if (step === GlitchAnimationStep.mouseEnter) {
      this.fixSVGAnimationBug();
    }

    if (this.timer && !startNow) {
      this.animationQueue.push(step);
      return;
    }

    this.animationQueue = [step];
    this.runNextAnimation();
  }

  private runNextAnimation = () => {
    clearTimeout(this.timer);
    this.timer = undefined;
    const step = this.animationQueue.shift();
    if (step === undefined) {
      return;
    }
    const body = this.bodyRefs[step]?.current;
    const face = this.faceRefs[step]?.current;
    const eyes = this.eyeRefs[step]?.current;

    // Bail early if any element is missing or browser does not support animation
    if (
      !body ||
      !body.beginElement ||
      !face ||
      !face.beginElement ||
      !eyes ||
      !eyes.beginElement
    ) {
      return;
    }

    // Run animation
    body.beginElement();
    face.beginElement();
    eyes.beginElement();
    if (
      step === GlitchAnimationStep.mouseEnter ||
      step === GlitchAnimationStep.mouseUp
    ) {
      this.runBlinkEyes();
    }
    this.timer = window.setTimeout(this.runNextAnimation, DURATIONS[step]);
  };

  private runBlinkEyes = () => {
    this.setState(() => ({
      // eslint-disable-next-line react/no-unused-state
      blinking: true,
    }));
  };

  /**
   * Safari has a bug where repeated svg smil animations can stop working.
   *
   * Without this fix, clicking on the glitch logo repeatedly in Safari will
   * cause the animations to stop playing after a few clicks.
   */
  private fixSVGAnimationBug() {
    /**
     * Do not apply this fix to Firefox;
     *
     * If this fix gets applied in Firefox, it can cause "jumpy animations"
     * where the logo does not smoothly transition between all of its states
     */
    if (!navigator.userAgent.toLowerCase().includes('safari/')) {
      return;
    }
    if (!this.svgRef.current) {
      return;
    }
    this.svgRef.current.pauseAnimations();
    this.svgRef.current.setCurrentTime(0);
    this.svgRef.current.unpauseAnimations();
  }
}
