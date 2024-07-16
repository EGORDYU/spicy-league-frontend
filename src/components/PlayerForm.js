import React, { useState, useContext } from 'react';
import axios from 'axios';
import AuthContext from '../AuthContext';

const PlayerForm = ({ player, onSave }) => {
    const { authTokens } = useContext(AuthContext);
    const [name, setName] = useState(player ? player.name : '');
    const [starcraftRank, setStarcraftRank] = useState(player ? player.starcraftrank : 'n/a');
    const [starcraftRace, setStarcraftRace] = useState(player ? player.starcraftrace : 'n/a');
    const [leagueRank, setLeagueRank] = useState(player ? player.leaguerank : 'n/a');
    const [leagueRole, setLeagueRole] = useState(player ? player.leaguerole : 'n/a');
    const [leagueSecondaryRole, setLeagueSecondaryRole] = useState(player ? player.leaguesecondaryrole : 'n/a');
    const [cs2Elo, setCs2Elo] = useState(player ? player.cs2elo : 0);
    const [profImage, setProfImage] = useState(player ? player.profimage : 'https://t4.ftcdn.net/jpg/00/64/67/27/360_F_64672736_U5kpdGs9keUll8CRQ3p3YaEv2M6qkVY5.jpg');
    const apiUrl = process.env.REACT_APP_API_URL;
    const handleSubmit = async (e) => {
        e.preventDefault();
        const playerData = {
            name,
            starcraftrank: starcraftRank,
            starcraftrace: starcraftRace,
            leaguerank: leagueRank,
            leaguerole: leagueRole,
            leaguesecondaryrole: leagueSecondaryRole,
            cs2elo: cs2Elo,
            profimage: profImage,
        };

        try {
            let response;
            if (player) {
                response = await axios.put(`${apiUrl}players/${player.id}/`, playerData, {
                    headers: {
                        Authorization: `Bearer ${authTokens.access}`
                    }
                });
            } else {
                response = await axios.post(`${apiUrl}players/`, playerData, {
                    headers: {
                        Authorization: `Bearer ${authTokens.access}`
                    }
                });
            }
            onSave(response.data);
        } catch (error) {
            console.error('Error saving player:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Name</label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </div>
            <div>
                <label>Starcraft Rank</label>
                <select value={starcraftRank} onChange={(e) => setStarcraftRank(e.target.value)}>
                    <option value="bronze">Bronze</option>
                    <option value="silver">Silver</option>
                    <option value="gold">Gold</option>
                    <option value="platinum">Platinum</option>
                    <option value="diamond">Diamond</option>
                    <option value="master">Master</option>
                    <option value="grandmaster">Grandmaster</option>
                    <option value="n/a">N/A</option>
                </select>
            </div>
            <div>
                <label>Starcraft Race</label>
                <select value={starcraftRace} onChange={(e) => setStarcraftRace(e.target.value)}>
                    <option value="terran">Terran</option>
                    <option value="zerg">Zerg</option>
                    <option value="protoss">Protoss</option>
                    <option value="n/a">N/A</option>
                </select>
            </div>
            <div>
                <label>League Rank</label>
                <select value={leagueRank} onChange={(e) => setLeagueRank(e.target.value)}>
                    <option value="iron">Iron</option>
                    <option value="bronze">Bronze</option>
                    <option value="silver">Silver</option>
                    <option value="gold">Gold</option>
                    <option value="platinum">Platinum</option>
                    <option value="emerald">Emerald</option>
                    <option value="diamond">Diamond</option>
                    <option value="master">Master</option>
                    <option value="grandmaster">Grandmaster</option>
                    <option value="challenger">Challenger</option>
                    <option value="n/a">N/A</option>
                </select>
            </div>
            <div>
                <label>League Role</label>
                <select value={leagueRole} onChange={(e) => setLeagueRole(e.target.value)}>
                    <option value="top">Top</option>
                    <option value="jungle">Jungle</option>
                    <option value="mid">Mid</option>
                    <option value="adc">ADC</option>
                    <option value="support">Support</option>
                    <option value="fill">Fill</option>
                    <option value="n/a">N/A</option>
                </select>
            </div>
            <div>
                <label>League Secondary Role</label>
                <select value={leagueSecondaryRole} onChange={(e) => setLeagueSecondaryRole(e.target.value)}>
                    <option value="top">Top</option>
                    <option value="jungle">Jungle</option>
                    <option value="mid">Mid</option>
                    <option value="adc">ADC</option>
                    <option value="support">Support</option>
                    <option value="fill">Fill</option>
                    <option value="n/a">N/A</option>
                </select>
            </div>
            <div>
                <label>CS2 Elo</label>
                <select value={cs2Elo} onChange={(e) => setCs2Elo(parseInt(e.target.value))}>
                    {[...Array(31).keys()].map(i => (
                        <option key={i} value={i * 1000}>{i * 1000}</option>
                    ))}
                </select>
            </div>
            <div>
                <label>Profile Image URL</label>
                <input
                    type="text"
                    value={profImage}
                    onChange={(e) => setProfImage(e.target.value)}
                />
            </div>
            <button type="submit">Save</button>
        </form>
    );
};

export default PlayerForm;
