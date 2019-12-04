import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  ResponsiveListHeader,
  ResponsiveListLines,
  ResponsiveListFooter,
  DesktopListTitle,
  DesktopListLine,
  MobileListLine,
  Desktop,
  Mobile,
} from '../common';

export default class ResponsiveList extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    mainCol: PropTypes.string.isRequired,
    cols: PropTypes.array.isRequired,
    items: PropTypes.array.isRequired,
    onGetOne: PropTypes.func.isRequired,
    onDelOne: PropTypes.func.isRequired,
    onReload: PropTypes.func.isRequired,
    onCreate: PropTypes.func.isRequired,
    onLoadMore: PropTypes.func.isRequired,
    titleSearch: PropTypes.Sstring,
    onSearch: PropTypes.func,
  };

  render() {
    return (
      <div className="responsive-list">
        <ResponsiveListHeader
          title={this.props.title}
          labelSearch={this.props.titleSearch}
          onQuickSearch={this.props.onSearch}
          onReload={this.props.onReload}
          onCreate={this.props.onCreate}
        />
        <Desktop>
          <DesktopListTitle cols={this.props.cols} />
        </Desktop>
        {this.props.items && (
          <div>
            {this.props.items.length > 0 ? (
              <ResponsiveListLines>
                {this.props.items.map(item => {
                  return (
                    <div key={item.id}>
                      <Mobile>
                        <MobileListLine
                          id={item.id}
                          item={item}
                          title={item[this.props.mainCol]}
                          onGetOne={this.props.onGetOne}
                          onDelOne={this.props.onDelOne}
                          lines={this.props.cols}
                        />
                      </Mobile>
                      <Desktop>
                        <DesktopListLine
                          id={item.id}
                          item={item}
                          onGetOne={this.props.onGetOne}
                          onDelOne={this.props.onDelOne}
                          cols={this.props.cols}
                        />
                      </Desktop>
                    </div>
                  );
                })}
              </ResponsiveListLines>
            ) : (
              <div>
                {!this.propd.loadMorePending &&
                  <p>Liste Vide</p>
                }
              </div>
            )}
          </div>
        )}
        <ResponsiveListFooter
          loadMorePending={this.props.loadMorePending}
          loadMoreFinish={this.props.loadMoreFinish}
          loadMoreError={this.props.loadMoreError}
          onLoadMore={this.props.onLoadMore}
        />
      </div>
    );
  }
}
