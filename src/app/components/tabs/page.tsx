import React, { useState } from "react";
import Link from "next/link";

export default function Tabs({ datas, characters, staffs }: any) {
    const [tabs, setTabs] = useState(1);

    const handleTabs = (index: number) => {
        setTabs(index);
    };

    return (
        <div className="flex flex-col gap-3">
            <div className="flex gap-2 bg-secondary">
                <div
                    className={`${
                        tabs === 1 ? "bg-tertiary text-white" : ""
                    } w-24 flex justify-center items-center h-14 cursor-pointer`}
                    onClick={() => handleTabs(1)}
                >
                    <p>Overview</p>
                </div>
                <div
                    className={`${
                        tabs === 2 ? "bg-tertiary text-white" : ""
                    } w-24 flex justify-center items-center h-14 cursor-pointer`}
                    onClick={() => handleTabs(2)}
                >
                    <p>Characters</p>
                </div>
                <div
                    className={`${
                        tabs === 3 ? "bg-tertiary text-white" : ""
                    } w-24 flex justify-center items-center h-14 cursor-pointer`}
                    onClick={() => handleTabs(3)}
                >
                    <p>Staff</p>
                </div>
            </div>
            <div
                className={`${
                    tabs == 1 ? "block" : "hidden"
                } flex flex-col gap-3`}
            >
                <div
                    className={`${
                        datas.relations.length > 0 ? "" : "hidden"
                    } p-2 bg-secondary rounded-sm shadow-md`}
                >
                    <h2>Relations</h2>
                    <div className="text-sm">
                        {datas.relations.map((relat: Relation, id: number) => (
                            <div
                                key={id}
                                className="border-b border-primary flex gap-2"
                            >
                                <p>{relat.relation}</p>
                                <div className="flex flex-col">
                                    {relat.entry.map((e) => (
                                        <div key={e.mal_id}>
                                            <Link
                                                href={
                                                    relat.relation.toLowerCase() ===
                                                    "adaptation"
                                                        ? `/detailsmanga/${e.mal_id}`
                                                        : `/details/${e.mal_id}`
                                                }
                                            >
                                                {e.name}
                                            </Link>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="p-2 bg-secondary rounded-sm shadow-md">
                    <h2>Characters</h2>
                    <div className="grid lg:grid-cols-3 gap-5">
                        {characters.slice(0, 9).map((char: any) => {
                            const japaneseVoiceActor = char.voice_actors.find(
                                (actor: any) => actor.language === "Japanese"
                            );

                            return (
                                <div
                                    className="flex justify-between shadow-md p-2 gap-2"
                                    key={char.character.mal_id}
                                >
                                    <div className="flex gap-2">
                                        <img
                                            src={
                                                char.character.images.jpg
                                                    .image_url
                                            }
                                            alt={char.character.name}
                                            className="w-20 h-20"
                                        />
                                        <div className="text-sm flex flex-col justify-between">
                                            <p>{char.character.name}</p>
                                            <p>{char.role}</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-2">
                                        {japaneseVoiceActor && (
                                            <div className="flex gap-2">
                                                <div className="text-right text-sm flex flex-col justify-between">
                                                    <p>
                                                        {
                                                            japaneseVoiceActor
                                                                .person.name
                                                        }
                                                    </p>
                                                    <p>
                                                        {
                                                            japaneseVoiceActor.language
                                                        }
                                                    </p>
                                                </div>
                                                <img
                                                    src={
                                                        japaneseVoiceActor
                                                            .person.images.jpg
                                                            .image_url
                                                    }
                                                    alt={
                                                        japaneseVoiceActor
                                                            .person.name
                                                    }
                                                    className="w-20 h-20"
                                                />
                                            </div>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
                <div className="p-2 bg-secondary rounded-sm shadow-md">
                    <h2>Staff</h2>
                    <div className="grid lg:grid-cols-3 gap-5">
                        {staffs.slice(0, 9).map((staff: any) => (
                            <div
                                className="flex justify-between shadow-md p-2 gap-2"
                                key={staff.person.mal_id}
                            >
                                <div className="flex gap-2">
                                    <img
                                        src={staff.person.images.jpg.image_url}
                                        alt={staff.person.name}
                                        className="w-20 h-20"
                                    />
                                    <div className="text-sm flex flex-col justify-between">
                                        <p>{staff.person.name}</p>
                                        <p>
                                            {staff.positions
                                                .map((p) => p)
                                                .join(", ")}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div
                className={`${
                    tabs == 2 ? "block" : "hidden"
                } p-2 bg-secondary rounded-sm shadow-md`}
            >
                <h2>Characters</h2>
                <div className="grid lg:grid-cols-3 gap-5">
                    {characters.map((char) => {
                        const japaneseVoiceActor = char.voice_actors.find(
                            (actor) => actor.language === "Japanese"
                        );

                        return (
                            <div
                                className="flex justify-between shadow-md p-2 gap-2"
                                key={char.character.mal_id}
                            >
                                <div className="flex gap-2">
                                    <img
                                        src={
                                            char.character.images.jpg.image_url
                                        }
                                        alt={char.character.name}
                                        className="w-20 h-20"
                                    />
                                    <div className="text-sm flex flex-col justify-between">
                                        <p>{char.character.name}</p>
                                        <p>{char.role}</p>
                                    </div>
                                </div>
                                {japaneseVoiceActor && (
                                    <div className="flex gap-2">
                                        <div className="text-right text-sm flex flex-col justify-between">
                                            <p>
                                                {japaneseVoiceActor.person.name}
                                            </p>
                                            <p>{japaneseVoiceActor.language}</p>
                                        </div>
                                        <img
                                            src={
                                                japaneseVoiceActor.person.images
                                                    .jpg.image_url
                                            }
                                            alt={japaneseVoiceActor.person.name}
                                            className="w-20 h-20"
                                        />
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
            <div
                className={`${
                    tabs == 3 ? "block" : "hidden"
                } p-2 bg-secondary rounded-sm shadow-md`}
            >
                <h2>Staffs</h2>
                <div className="grid lg:grid-cols-3 gap-5">
                    {staffs.map((staff: any) => (
                        <div
                            className="flex justify-between shadow-md p-2 gap-2"
                            key={staff.person.mal_id}
                        >
                            <div className="flex gap-2">
                                <img
                                    src={staff.person.images.jpg.image_url}
                                    alt={staff.person.name}
                                    className="w-20 h-20"
                                />
                                <div className="text-sm flex flex-col justify-between">
                                    <p>{staff.person.name}</p>
                                    <p>
                                        {staff.positions
                                            .map((p) => p)
                                            .join(", ")}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
