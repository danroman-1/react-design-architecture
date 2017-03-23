import React, { PureComponent, PropTypes } from 'react';
import cn from 'classnames';

import getField from '../utils/getField';
import injectTooltip from '../Tooltips/injectTooltip';
import Collapser from '../FontIcons/Collapser';
import IconSeparator from '../Helpers/IconSeparator';

const CELL_SCOPE = {
  header: {
    scope: 'col',
  },
  noop: {},
};

/**
 * A column in a table. This is either the `th` or `td` component. This column
 * can be automatically configured to be adjusted with additional padding
 * or auto expand to fill the remaining table space if the `TableRow` component
 * has `autoAdjust` set to `true`. If you would like to prevent this column
 * for being a candidate for auto expanding to remaining space, add the className
 * `.prevent-grow`.
 */
class TableColumn extends PureComponent {
  static propTypes = {
    /**
     * An optional style to apply.
     */
    style: PropTypes.object,

    /**
     * The optional className for the table column
     */
    className: PropTypes.string,

    /**
     * The children to display in the column.
     */
    children: PropTypes.node,

    /**
     * Boolean if the column is currently sorted. If this prop is not `undefined`,
     * it will add the sort icon unto this column. You will also need to use the
     * `onClick` function to toggle the `sorted` prop as well as handling the sorting
     * of data.
     *
     * This value should really only be set in the `TableHeader` component.
     */
    sorted: PropTypes.bool,

    /**
     * The optional icon children to display in the sort icon.
     */
    sortIconChildren: PropTypes.node,

    /**
     * The icon className for the sort icon.
     */
    sortIconClassName: PropTypes.string.isRequired,

    /**
     * A boolean if the column has numeric data. It will right-align the data.
     */
    numeric: PropTypes.bool,

    /**
     * Boolean if this column should be adjusted with additional padding. This *should*
     * be handled automatically by the `TableRow` component but can be set manually as well.
     */
    adjusted: PropTypes.bool,

    /**
     * Boolean if this column is the `th` for a column of `SelectFieldColumn`. This will apply
     * additional styling to the column to position with the select field.
     */
    selectColumnHeader: PropTypes.bool,

    /**
     * Boolean if this is a `th` component. This value **should** be set
     * automatically for you if it is in the `TableHeader` component.
     */
    header: PropTypes.bool.isRequired,

    /**
     * The optional tooltip to render on hover.
     */
    tooltipLabel: PropTypes.string,

    /**
     * An optional delay to apply to the tooltip before it appears.
     */
    tooltipDelay: PropTypes.number,

    /**
     * The position of the tooltip.
     */
    tooltipPosition: PropTypes.oneOf(['top', 'right', 'bottom', 'left']),

    /**
     * The injected tooltip.
     * @access private
     */
    tooltip: PropTypes.node,

    /**
     * Boolean if the `TableColumn` should gain the `plain` styles. This means that the text
     * in the column can wrap and there is no height limit enforced with some additional padding.
     */
    plain: PropTypes.bool,

    /**
     * An optional scope to apply to the table column. If omitted, the scope will be set to
     * `'col'` if inside of the `TableHeader` component. This is really only needed for
     * header columns.
     */
    scope: PropTypes.oneOf(['row', 'col']),

    /**
     * This is injected by the `TableRow` component to help with generating ids
     * @access private
     */
    cellIndex: PropTypes.number,
  };

  static defaultProps = {
    header: false,
    sortIconClassName: 'material-icons',
    sortIconChildren: 'arrow_upward',
  };

  static contextTypes = {
    plain: PropTypes.bool,
  };

  render() {
    const {
      className,
      numeric,
      adjusted,
      header,
      children,
      sorted,
      sortIconChildren,
      sortIconClassName,
      tooltip,
      selectColumnHeader,
      /* eslint-disable no-unused-vars */
      plain: propPlain,
      scope: propScope,
      cellIndex,
      /* eslint-enable no-unused-vars */
      ...props
    } = this.props;

    const sortable = typeof sorted === 'boolean';
    const plain = getField(this.props, this.context, 'plain');
    const Component = header ? 'th' : 'td';
    const scope = getField(this.props, CELL_SCOPE[header ? 'header' : 'noop'], 'scope');

    let displayedChildren = children;
    let ariaSort;
    if (sortable) {
      ariaSort = sorted ? 'ascending' : 'descending';
      displayedChildren = (
        <IconSeparator label={children} iconBefore>
          <Collapser flipped={!sorted} iconClassName={sortIconClassName}>
            {sortIconChildren}
          </Collapser>
        </IconSeparator>
      );
    }

    return (
      <Component
        aria-sort={ariaSort}
        {...props}
        scope={scope}
        className={cn('md-table-column', {
          'md-table-column--header': header,
          'md-table-column--data': !header && !plain,
          'md-table-column--plain': !header && plain,
          'md-table-column--adjusted': adjusted,
          'md-table-column--sortable md-pointer--hover': sortable,
          'md-table-column--relative': tooltip,
          'md-table-column--select-field': selectColumnHeader,
          'md-text': !header,
          'md-text--secondary': header,
          'md-text-left': !numeric,
          'md-text-right': numeric,
        }, className)}
      >
        {tooltip}
        {displayedChildren}
      </Component>
    );
  }
}

export default injectTooltip(TableColumn);
