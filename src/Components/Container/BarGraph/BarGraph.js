import React, { Component } from 'react';
import { axisLeft, axisBottom } from 'd3-axis';
import { scaleBand, scaleLinear } from 'd3-scale';
import { select } from 'd3-selection';

import Bar from './Bar';
import Tooltip from '../../Presentational/Tooltip';

class BarGraph extends Component {
	constructor(props) {
		super(props);
		this.state = {
			visibility: 'hidden',
			margin: 25,
			toolTipX: 0,
			toolTipY: 0
		};
	}

	componentDidMount() {
		this.drawXAxis();
		this.drawYAxis(true);
	}

	componentDidUpdate(prevProps, prevState) {
		if (prevProps.data !== this.props.data) {
			this.drawXAxis();
			this.drawYAxis();
		}
	}

	getXScale = () => {
		const { data } = this.props;
		console.log(data);
		this.xScale = scaleBand()
			.domain(data.map(d => d.name))
			.rangeRound([0, this.props.x - this.state.margin])
			.padding(0.1);
		return this.xScale;
	};

	getYScale = () => {
		const { data } = this.props;
		this.yScale = scaleLinear()
			.domain([0, 110])
			.rangeRound([this.props.y - this.state.margin, this.state.margin]);
		return this.yScale;
	};

	drawXAxis = () => {
		select(this.xAxisRef)
			.attr(
				'transform',
				'translate(' +
					this.state.margin +
					',' +
					(this.props.y - this.state.margin) +
					')'
			)
			.call(axisBottom(this.getXScale()));
	};

	drawYAxis = () => {
		select(this.yAxisRef)
			.attr('transform', 'translate(' + this.state.margin + ',0)')
			.call(axisLeft(this.getYScale()));
	};

	toggleToolTip = (x, y) => {
		this.setState({
			toolTipX: x,
			toolTipY: y,
			visibility: 'visible'
		});
	};
	toggleToolTipOff = () => {
		this.setState({ visibility: 'hidden' });
	};

	render() {
		const { x, y, data } = this.props;
		const xScale = this.getXScale();
		const yScale = this.getYScale();

		return (
			<svg width={x} height={y}>
				<g>
					<g ref={ref => (this.xAxisRef = ref)} />
					<g ref={ref => (this.yAxisRef = ref)} />
					{data.map((d, i) => (
						<Bar
							key={i}
							x={xScale(d.name) + this.state.margin}
							y={yScale(d.sameness)}
							width={xScale.bandwidth()}
							height={y - yScale(d.sameness) - this.state.margin}
							color={d.color}
							toggleToolTip={this.toggleToolTip}
							toggleToolTipOff={this.toggleToolTipOff}
						/>
					))}
					<Tooltip
						x={this.state.toolTipX}
						y={this.state.toolTipY}
						visibility={this.state.visibility}
					/>
				</g>
			</svg>
		);
	}
}

export default BarGraph;