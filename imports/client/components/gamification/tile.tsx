import {Component, PropTypes} from 'react';
import * as React from 'react';
import {IGamificationRecord} from "../../../collections/gamification/collection";
import {KEYS} from "../../../server/gamification/constants";

import * as moment from 'moment';

export interface ITileProps {
    recordKey: string;
    value: any;
}

const styles = require('./tile.styl');
export const tileContentTemplate = {
    [KEYS.BUSIEST_DAY](value) {
        return (
            <section className={styles.value}>
                <span className={styles.front}>{value.count}</span>
            </section>
        );
    },
    [KEYS.HOT_STREAK](value) {
        let content;
        const end = moment(value.end).utc();
        const start = moment(value.start).utc();
        const endsToday = moment().diff(end, 'days') === 0;
        const endedYesterday = moment().diff(end, 'days') === 1;

        if (!endsToday && !endedYesterday) {
            content = 0;
        } else {
            content = end.diff(start, 'days');
            if (!content) {
                content = 1;
            }
        }

        return (
            <section className={styles.value}>
                <span className={styles.front}>{content}</span>
            </section>
        );
    },
    [KEYS.TOTAL_POSTS](value) {
        return (
            <section className={styles.value}>
                <span className={styles.front}>{value}</span>
            </section>
        );
    }
};

export const tileName = {
    [KEYS.BUSIEST_DAY]: 'Busiest day',
    [KEYS.HOT_STREAK]: 'Hot streak',
    [KEYS.TOTAL_POSTS]: 'Total posts'
};

export class Tile extends Component<ITileProps, {}> {
    render() {
        const {recordKey: key, value} = this.props;

        return (
            <section className={styles.root}>
                <div className={styles.content}>
                    <header className={styles.header}>
                        <h4 className={styles.name}>{ tileName[key] }</h4>
                    </header>
                    { tileContentTemplate[key](value) }
                </div>
            </section>
        );
    }
}