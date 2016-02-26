import React, { PropTypes } from 'react';
import Markdown from '../../Markdown';

const markdown = `
> The floating action button can fling out related actions upon press.
> The button should remain on screen after the menu is invoked. Tapping
> in the same spot should either activate the most commonly used action
> or close the open menu.

[Floating Action Buttons](https://www.google.com/design/spec/components/buttons-floating-action-button.html#buttons-floating-action-button-floating-action-button)

> As a general rule, have at least three options upon press but not more
> than six, including the original floating action button target. If you
> have two options – i.e. your floating action button only flings out one
> other choice – choose which action is most important. If you have more
> than six, users may have trouble reaching the furthest option.

> Reduce decision fatigue by giving users the best, most distinct, and fewest options.

The Speed Dial transition is implemented by using the \`SpeedDial\` component
which creates a \`FloatingButton\` from the props and a list of \`FloatingButton\`
from the \`fabs\` props.

The Speed Dial Component is a controlled component, so you must handle the opening
and closing of the speed dial yourself.
`;

const SpeedDialMarkdown = (props) => {
  return <Markdown markdown={markdown} {...props} />;
};

SpeedDialMarkdown.propTypes = {
  marked: PropTypes.func.isRequired,
};

export default SpeedDialMarkdown;
