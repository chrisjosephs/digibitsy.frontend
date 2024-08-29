import React, {Suspense, useEffect, useMemo, useRef, useState} from 'react'
// import {Timeline, TimelineEvent} from '@mailtop/horizontal-timeline'
import {FaBug, FaRegCalendarCheck, FaRegFileAlt} from 'react-icons/fa'
import PerfectScrollbar from 'react-perfect-scrollbar';
import 'react-perfect-scrollbar/dist/css/styles.css';
import {GenIcon} from "react-icons";
import BidX1Icon from "../images/bidx1Icon.js";
import Icon from 'react-icon-base';

export var bidX1img = function (props) {
    return GenIcon({"tag":"svg","attr":{"viewBox":"0 0 512 512"},"child":[{"tag":"path","attr":{"d":"M464 0H144c-26.5 0-48 21.5-48 48v48H48c-26.5 0-48 21.5-48 48v320c0 26.5 21.5 48 48 48h320c26.5 0 48-21.5 48-48v-48h48c26.5 0 48-21.5 48-48V48c0-26.5-21.5-48-48-48zm-96 464H48V256h320v208zm96-96h-48V144c0-26.5-21.5-48-48-48H144V48h320v320z"}}]})(props);
};
bidX1img.displayName = "bidx1 logo";

console.log("fabug");
console.log(FaBug);
const CareerPage = () => (
// I HAVE NEVAR: on mysql typed UPDATE `articles` SET `content` = REPLACE('content', '---', '<hr>'; - see Tom Scott
// tom-scott-thumbs-up-jpg

      <div className={"CareerPage"}>
        <p>//  As a contractor under the flag of Dibigitsymicronanocyberweb since 2017 (Compuglobalhypermeganet was already taken), Christopher Josephs Esq, has been using a very big ferry called FerryMcFerryFace, plying ports on site from as North as Manchester and Liverpool, as West as Dublin, and as South as Brighton and Bournemouth,
        //  and even at Cambridge but that was wierd and full of Harry Potter colleges people in pointy hats,
        //  and once I accidently ran over a tramp in a graveryard at midnight on my bike.
        // The technical details of this tour is explained in detail on my CV.</p><br/>

        Highlights:<br/>
        { /*
    <Timeline minEvents={3} placeholder >
        <span className={"bidx1-icon"}>
        <TimelineEvent
            color='#36e292'
            icon={BidX1Icon}
            title='Bidx1'
            subtitle='10/2018 New Site'
        />
        </span>
        <TimelineEvent
            color='rgb(209,0,177)       '
            icon={FaRegCalendarCheck}
            title='Darley Stallions'
            subtitle='for CPL 07/2018 Drupal 8 site migration'
        />
        <TimelineEvent
            color='#C0C0C0'
            icon={FaBug}
            title='LGBCE'
            subtitle='for Informed Solutions 01/2018'
            action={{
                label: 'Ver detalhes...',
                onClick: () => window.alert('Erro!')
            }}
        />
        <TimelineEvent
            color='#xb81726'
            icon={FaBug}
            title='NDA - gov.uk'
            subtitle='for NDA    01/2018'
            action={{
                label: 'Ver detalhes...',
                onClick: () => window.alert('Erro!')
            }}
        />
        <TimelineEvent
            color='#9c2919'
            icon={FaBug}
            title='CPI'
            subtitle='26/03/2019 09:51'
            action={{
                label: 'Ver detalhes...',
                onClick: () => window.alert('Erro!')
            }}
        />
        <TimelineEvent
            color='#9c2919'
            icon={FaBug}
            title='Erro'
            subtitle='26/03/2019 09:51'
            action={{
                label: 'Ver detalhes...',
                onClick: () => window.alert('Erro!')
            }}
        />
        <TimelineEvent
            color='#9c2919'
            icon={FaBug}
            title='Erro'
            subtitle='26/03/2019 09:51'
            action={{
                label: 'Ver detalhes...',
                onClick: () => window.alert('Erro!')
            }}
        />
    </Timeline>
 **/ }
    </div>

)
export default CareerPage
