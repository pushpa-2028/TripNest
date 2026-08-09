import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import {
  FaUser,
  FaEnvelope,
  FaUserShield,
  FaUsers,
  FaTrash,
  FaPlus
} from "react-icons/fa";

import "../styles/TripMembers.css";

function TripMembers() {

    const { id } = useParams();

    const [members, setMembers] = useState([]);

    const [memberName, setMemberName] = useState("");
    const [memberEmail, setMemberEmail] = useState("");
    const [role, setRole] = useState("Member");

    useEffect(() => {
        fetchMembers();
    }, []);

    const fetchMembers = async () => {

        try {

            const response = await axios.get(
                `https://tripnest-fird.onrender.com/api/trip-members/trip/${id}`
            );

            setMembers(response.data);

        } catch (error) {

            console.log(error);

        }

    };

    const addMember = async (e) => {

        e.preventDefault();

        try {

            await axios.post(
                "https://tripnest-fird.onrender.com/api/trip-members",
                {
                    tripId: id,
                    memberName,
                    memberEmail,
                    role
                }
            );

            setMemberName("");
            setMemberEmail("");
            setRole("Member");

            fetchMembers();

        } catch (error) {

            console.log(error);

            alert("Failed to add member.");

        }

    };

    const deleteMember = async (memberId) => {

        if (!window.confirm("Remove this member?")) return;

        try {

            await axios.delete(
                `https://tripnest-fird.onrender.com/api/trip-members/${memberId}`
            );

            fetchMembers();

        } catch (error) {

            console.log(error);

        }

    };

    return (

        <div className="membersPage">

            <div className="membersHeader">

                <h1>👥 Trip Members</h1>

                <p>

                    Manage everyone joining your trip.

                </p>

            </div>

            <form
                className="memberForm"
                onSubmit={addMember}
            >

                <input
                    type="text"
                    placeholder="Member Name"
                    value={memberName}
                    onChange={(e)=>setMemberName(e.target.value)}
                    required
                />

                <input
                    type="email"
                    placeholder="Member Email"
                    value={memberEmail}
                    onChange={(e)=>setMemberEmail(e.target.value)}
                    required
                />

                <select
                    value={role}
                    onChange={(e)=>setRole(e.target.value)}
                >

                    <option>Owner</option>
                    <option>Member</option>

                </select>

                <button type="submit">

                    <FaPlus/>

                    Add Member

                </button>

            </form>

            <div className="memberGrid">

                {members.length===0 ? (

                    <div className="emptyMembers">

    <FaUsers className="emptyIcon" />

    <h2>No Members Yet</h2>

    <p>Invite your travel companions to start collaborating.</p>

    <button
        className="addAgainBtn"
        onClick={() =>
            document.querySelector(".memberForm input")?.focus()
        }
    >
        <FaPlus />
        Add Member
    </button>

</div>

                ) : (

                    members.map((member)=>{

                        const initials = member.memberName
                            .split(" ")
                            .map(word => word[0])
                            .join("")
                            .toUpperCase();

                        return(

                            <div
                                className="memberCard"
                                key={member.id}
                            >

                                <div className="avatar">

                                    {initials}

                                </div>

                                <h2>

                                    {member.memberName}

                                </h2>

                                <p className="email">

                                    <FaEnvelope/>

                                    {member.memberEmail}

                                </p>

                                <span
                                    className={
                                        member.role==="Owner"
                                        ? "role owner"
                                        : "role member"
                                    }
                                >

                                    <FaUserShield/>

                                    {member.role}

                                </span>

                                <button
                                    className="removeBtn"
                                    onClick={()=>
                                        deleteMember(member.id)
                                    }
                                >

                                    <FaTrash/>

                                    Remove

                                </button>

                            </div>

                        );

                    })

                )}

            </div>

        </div>

    );

}

export default TripMembers;
