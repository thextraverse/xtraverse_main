import React from 'react';
import WertWidget from '@wert-io/widget-initializer';



class WertModule extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      wertOptions: {
        partner_id: '{{01GTHWYNY9KCEM27GPDJCS11Q6}}',
        listeners: {
          loaded: () => console.log('loaded'),
        },
        // Other Wert options...
      },
    };

    const defaultContainerId = 'wert-module';
    const wertWidget = new WertWidget({
      container_id: defaultContainerId,
      ...(props.options || {}),
    });
    const passThroughProps = {
      id: props.options.container_id || defaultContainerId,
      ...(props || {}),
      options: undefined,
    };

    this.wertWidget = wertWidget;
    this.state = {
      passThroughProps,
    };
  }

  componentDidMount() {
    this.wertWidget.mount();
  }

  componentDidUpdate(prevProps) {
    const themeChanged = this.props.options.theme !== prevProps.options.theme;
    const newColors = Object.keys(this.props.options || {})
      .filter(key => key.startsWith('color'))
      .reduce((accum, key) => {
        const newColor = this.props.options[key];
        const oldColor = prevProps.options[key];

        if (newColor !== oldColor) {
          accum[key] = newColor;
        }

        return accum;
      }, {});
    const colorsChanged = !!Object.keys(newColors).length;

    if (themeChanged || colorsChanged) this.wertWidget.setTheme({
      theme: this.props.options.theme,
      colors: newColors,
    });
  }

  componentWillUnmount() {
    this.wertWidget.destroy();
  }

  render() {
    return (
      <div {...this.state.passThroughProps} />
    );
  }
}

export default WertModule;
