import React from "react";
import PropTypes from "prop-types";
import { List, AutoSizer, CellMeasurer, CellMeasurerCache } from "react-virtualized";
import _ from "underscore";
import { overscanRowCount } from "../../constants/common";

class InfiniteList extends React.Component {
  cache = new CellMeasurerCache({
    fixedWidth: true,
    defaultHeight: 100,
  });

  rowRenderer = ({ index, key, parent, style }) => {
    const { rowRenderer, list } = this.props;
    return (
      <CellMeasurer key={key} cache={this.cache} parent={parent} columnIndex={0} rowIndex={index}>
        <div style={style} key={key}>
          {rowRenderer(list[index])}
        </div>
      </CellMeasurer>
    );
  };
  render = () => {
    return (
      <AutoSizer>
        {({ width, height }) => (
          <List
            width={width}
            height={height}
            deferredMeasurementCache={this.cache}
            rowHeight={this.props.rowHeight ? this.props.rowHeight : this.cache.rowHeight}
            rowRenderer={this.rowRenderer}
            rowCount={this.props.rowCount}
            overscanRowCount={this.props.overscanRowCount}
            ref={this.props.setRef}
          />
        )}
      </AutoSizer>
    );
  };
}
InfiniteList.propTypes = {
  rowCount: PropTypes.number,
  overscanRowCount: PropTypes.number,
  rowRenderer: PropTypes.func,
  rowHeight: PropTypes.oneOfType([PropTypes.number, PropTypes.func]),
  list: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.object), PropTypes.arrayOf(PropTypes.string)]),
  setRef: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
};

InfiniteList.defaultProps = {
  overscanRowCount,
  setRef: _.noop,
};

export default InfiniteList;
