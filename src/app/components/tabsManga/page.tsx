import React, { useState } from "react";
import Link from "next/link";

export default function TabsManga({ datas, characters }: any) {
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
                            return (
                                <div
                                    className="flex shadow-md p-2 gap-2"
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
                                </div>
                            );
                        })}
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
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
