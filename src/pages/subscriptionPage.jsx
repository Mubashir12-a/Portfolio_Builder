import '../pagesStyles/subscriptionPage.css';
import Header from "../components/LandingPageComponents/header";

import waiting from '../assets/waiting.gif';
import parrot from '../assets/Parrot.gif';

import secure from '../assets/secure.png';
import cancel from '../assets/cancel.png';
import cards from '../assets/cards.png';
import users from '../assets/users.png';
import rating from '../assets/rating.png';
import student from '../assets/student.png';

import Btn_Primary from '../components/GeneralComponents/buttonPrimary.jsx';

import { useState } from 'react';


let Plan_1_Price = 0;
let Plan_2_Price = 150;
let Plan_3_Price = 300;



export default function Subscription(){
    return (
        <>
            <Header comp={BtnsSet}/>
            <Caption/>


            <section id="cardContainer">
                {/* <CardLayout obj={PlanCard1}/> */}
                {/* <CardLayout obj={PlanCard2}/> */}
                <CardLayout obj={PlanCard3}/>
            </section>

            <Tabs/>

            <section id="gurantee">
                <div>
                    <span>🛡️</span>
                    <h3>7-Day <em>Money-Back</em> Guarantee</h3>
                    <p>Not happy with your upgrade? Get a full refund within 7 days — no questions asked. We're confident you'll love it, but your peace of mind comes first.</p>
                </div>
            </section>

            <Table/>
        </>
    )
}







function BtnsSet(){
    return (
        <>
            <Btn_Primary title={"Templates"}/>
            <Btn_Primary title={"Sign-up-free"}/>
        </>
    )
}

function Caption(){
    const [billingType, setBillingType] = useState("plan_1");

    return (
        <>
            <section id="caption">
                <div className="shade"></div>
                <img src={waiting} alt="" />
                <img src={parrot} alt="" />

                <div className="tag">
                    <div>
                        <span></span>
                        <p>Save up to 50% on long-term plans</p>
                    </div>
                    <h1>Simple, <em>transparent</em><br/>pricing.</h1>
                    <p>Start free. Upgrade when you're ready. No hidden fees, no surprises — cancel anytime.</p>
                </div>

                <div className="billingTab">
                    <p>Choose Billing Cycle</p>
                    <div className="tabs">
                        <button onClick={() => {
                            setBillingType("plan_1");
                        }} className={
                            billingType === "plan_1" ? 'activeBtn' : null
                        }>Monthly<span>-5%</span></button>

                        <button onClick={() => {
                            setBillingType("plan_2");
                        }} className={
                            billingType === "plan_2" ? 'activeBtn' : null
                        }>6 Months<span>-20%</span></button>

                        <button onClick={() => {
                            setBillingType("plan_3")
                        }} className={
                            billingType === "plan_3" ? 'activeBtn' : null
                        }>Yearly<span>-30%</span></button>

                        <button onClick={() => {
                            setBillingType("plan_4")
                        }} className={
                            billingType === "plan_4" ? 'activeBtn' : null
                        }>3 Years<span>-50%</span></button>
                    </div>
                </div>
            </section>
        </>
    )
}

function Tabs(){
    return (
        <>
            <section id='tabs'>
                <div className="tab">
                    <div></div>
                    <img src={secure} alt="" /> 
                    <p>SSL Secured Payments</p>
                </div>
                <div className="tab">
                    <div></div>
                    <p>Cancel Anytime</p>
                    <img src={cancel} alt="" /> 
                </div>
                <div className="tab">
                    <div></div>
                    <img src={cards} alt="" /> 
                    <p>All Major Cards</p>
                </div>
                <div className="tab">
                    <div></div>
                    <p>2,400+ Active Users</p>
                    <img src={users} alt="" /> 
                </div>
                <div className="tab">
                    <div></div>
                    <img src={rating} alt="" /> 
                    <p>4.9 / 5 Rating</p>
                </div>
                <div className="tab">
                    <div></div>
                    <p>Student Friendly</p>
                    <img src={student} alt="" /> 
                </div>
            </section>
        </>
    )
}

function Tabledata({a1, a1_Color, a2, a2_Color, a3, a3_Color, a4, a4_Color}){
    return (
        <>
            <tbody>
                <tr>
                    <td className={` ${a1_Color}`}>{a1}</td>
                    <td className={` ${a2_Color}`}>{a2}</td>
                    <td className={` ${a3_Color}`}>{a3}</td>
                    <td className={` ${a4_Color}`}>{a4}</td>
                </tr>
            </tbody>
        </>
    )
}

function Table(){
    return (
        <>
            <section id="tableCompare">
                <h1>Feature comparison</h1>
                <p>Every feature, side by side across all three plans.</p>
                <table>
                    <thead>
                        <tr>
                            <th></th>
                            <th className='violet'>🌱 Free</th>
                            <th className='violet'>⚡Studio</th>
                            <th className='gold'>👑 Pro</th>
                        </tr>
                    </thead>

                    <Tabledata a1='Portfolios' a1_Color = "none"
                               a2='1' a2_Color="violet"
                               a3='5' a3_Color="violet"
                               a4='Unlimited' a4_Color="gold" />

                    <Tabledata a1='Templates' a1_Color = "none"
                               a2='3 Free' a2_Color="violet"
                               a3='All 12' a3_Color="violet"
                               a4='All + Early' a4_Color="gold" />

                    <Tabledata a1='HTML / CSS export' a1_Color = "none"
                               a2='✓' a2_Color="mint"
                               a3='✓' a3_Color="mint"
                               a4='✓' a4_Color="mint" />

                    <Tabledata a1='React / JSX export' a1_Color = "none"
                               a2='-' a2_Color="none"
                               a3='✓' a3_Color="mint"
                               a4='✓' a4_Color="mint" />

                    <Tabledata a1='PDF export' a1_Color = "none"
                               a2='-' a2_Color="none"
                               a3='✓' a3_Color="mint"
                               a4='✓' a4_Color="mint" />

                    <Tabledata a1='PNG / WebP export' a1_Color = "none"
                               a2='✓' a2_Color="mint"
                               a3='✓' a3_Color="mint"
                               a4='✓' a4_Color="mint" />

                    <Tabledata a1='Custom domain' a1_Color = "none"
                               a2='-' a2_Color="none"
                               a3='✓' a3_Color="mint"
                               a4='✓' a4_Color="mint" />
                               
                    <Tabledata a1='Remove branding' a1_Color = "none"
                               a2='-' a2_Color="none"
                               a3='✓' a3_Color="mint"
                               a4='✓' a4_Color="mint" />
                               
                    <Tabledata a1='Analytics' a1_Color = "none"
                               a2='-' a2_Color="none"
                               a3='Basic' a3_Color="violet"
                               a4='Advanced + UTM' a4_Color="gold" />
                               
                    <Tabledata a1='Team collaboration' a1_Color = "none"
                               a2='-' a2_Color="none"
                               a3='-' a3_Color="none"
                               a4='Upto 10 seats' a4_Color="gold" />
                               
                    <Tabledata a1='API access' a1_Color = "none"
                               a2='-' a2_Color="none"
                               a3='-' a3_Color="none"
                               a4='✓' a4_Color="mint" />
                               
                    <Tabledata a1='Support' a1_Color = "none"
                               a2='community' a2_Color="violet"
                               a3='Email (48h)' a3_Color="violet"
                               a4='Priority (4h)' a4_Color="gold" />
                               
                    <Tabledata a1='Account manager' a1_Color = "none"
                               a2='-' a2_Color="none"
                               a3='-' a3_Color="none"
                               a4='✓' a4_Color="mint" />
                </table>
            </section>
        </>
    )
}


function CardLayout({obj: card}){
    return (
        <>
            <section id="planCards">
                <h6 className="islandTab">{card.islandTab}</h6>

                <div>
                    <span className="icon">{card.icon}</span>
                    <h2>{card.planType}</h2>
                    <p>{card.planDiscrip}</p>
                    <div className="DynaPrice">
                        <h3><em>{Plan_1_Price}</em> /mo</h3>
                        <p>Forever free. Always.</p>
                    </div>
                    <button>{card.btntext}</button>
                </div>

                <ul>
                    <Li card={card} n={1}/>
                    <Li card={card} n={2}/>
                    <Li card={card} n={3}/>
                    <Li card={card} n={4}/>
                    <Li card={card} n={5}/>
                    <Li card={card} n={6}/>
                    <Li card={card} n={7}/>
                    <Li card={card} n={8}/>
                    <Li card={card} n={9}/>
                    <Li card={card} n={10}/>
                </ul>
            </section>
        </>
    )
}

function Li({card, n}){
    return (
        <li>
            <span className={`icon ${card[`li_${n}`][`li_${n}_icon`] === 'X' ? "red" : ""}`}>{card[`li_${n}`][`li_${n}_icon`]}</span>
            <p>{card[`li_${n}`][`li_${n}_caption`]}</p>
        </li>
    )
}


const PlanCard1 = {
    islandTab: "Basic",
    icon: "🌱",
    planType: "Free",
    planDiscrip: "For students just getting started. No credit card required, ever.",
    btntext: "Get Started Free →",

    li_1: "1 Portfolio site",
    li_2: "3 free templates",
    li_3: "HTML + CSS export",
    li_4: "portfoliobuilder.app subdomain",
    li_5: "PNG screenshot export",
    li_6: "Custom domain",
    li_7: "React / JSX export",
    li_8: "PDF export",
    li_9: "Remove branding",
    li_10: "Analytics"
};
const PlanCard2 = {
    islandTab: "Recommended",
    icon: "⚡",
    planType: "Studio",
    planDiscrip: "For job seekers and freelancers who need to stand out and get hired.",
    btntext: "Started Studio Plan →",

    li_1: "5 Portfolios",
    li_2: "All 12 templates",
    li_3: "HTML + CSS export",
    li_4: "portfoliobuilder.app subdomain",
    li_5: "PNG screenshot export",
    li_6: "Custom domain",
    li_7: "React / JSX export",
    li_8: "PDF export",
    li_9: "Remove branding",
    li_10: "Analytics"
};
const PlanCard3 = {
    islandTab: "Premium",
    icon: "👑",
    planType: "Pro",
    planDiscrip: "For agencies, teams, and power users managing multiple client portfolios.",
    btntext: "Upgrade To Pro →",

    li_1: {
        li_1_icon: 'X',
        li_1_caption: "1 Portfolio site"
    },
    li_2: {
        li_2_icon: '✓',
        li_2_caption: "3 free templates"
    },
    li_3: {
        li_3_icon: 'X',
        li_3_caption: "HTML + CSS export"
    },
    li_4: {
        li_4_icon: '✓',
        li_4_caption: "portfoliobuilder.app subdomain"
    },
    li_5: {
        li_5_icon: '✓',
        li_5_caption: "PNG screenshot export"
    },
    li_6: {
        li_6_icon: 'X',
        li_6_caption: "Custom domain"
    },
    li_7: {
        li_7_icon: 'X',
        li_7_caption: "React / JSX export"
    },
    li_8: {
        li_8_icon: '✓',
        li_8_caption: "PDF export"
    },
    li_9: {
        li_9_icon: 'X',
        li_9_caption: "Remove branding"
    },
    li_10: {
        li_10_icon: '✓',
        li_10_caption: "Analytics"
    }
};