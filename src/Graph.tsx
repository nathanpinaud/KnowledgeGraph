import { Graph } from "react-d3-graph";
import { Button, Box, TextField, FormControl, InputLabel, Select, MenuItem, Checkbox, FormControlLabel, Typography } from '@mui/material';
import { useEffect, useState } from "react";


interface Node {
    id: string;

    symbolType?: string;
    color?: string;

    attr: Node[];
}

interface Link {
    source: string;
    target: string;
    label: string;
    color?: string;
    strokeDasharray?: string;
}

interface Attribute {
    node: Node;
    link: Link;
}

export const GraphPage = () => {
    const [title, setTitle] = useState('');

    const [type, setType] = useState('concept');

    const [search, setSearch] = useState("");
    const [node1Search, setNode1Search] = useState("");
    const [node2Search, setNode2Search] = useState("");
    const [distance, setDistance] = useState(0);

    const [path, setPath] = useState([] as string[]);

    const [data, setData] = useState({
        nodes: [
            { id: "Counter-Strike" },
            { id: "Weapon", symbolType: "square" }, //carré = concept
            { id: "Riffle", symbolType: "square" },
            { id: "Pistol", symbolType: "square" },
            { id: "Sniper", symbolType: "square" },
            { id: "Shotgun", symbolType: "square" },
            { id: "SMG", symbolType: "square" },
            { id: "Famas" },    //rond par défault = instance
            { id: "Glock-18" },
            { id: "AK-47" },
            { id: "M4A1" },
            { id: "M4A4" },
            { id: "USP-S" },
            { id: "Desert Eagle" },
            { id: "P250" },
            { id: "Tec-9" },
            { id: "Five-Seven" },
            { id: "AWP" },
            { id: "SSG 08" },
            { id: "G3SG1" },
            { id: "SCAR-20" },
            { id: "MAG-7" },
            { id: "Nova" },
            { id: "XM1014" },
            { id: "Sawed-Off" },
            { id: "MP9" },
            { id: "MAC-10" },
            { id: "MP7" },
            { id: "UMP-45" },
            { id: "P90" },
            { id: "PP-Bizon" },
            { id: "MP5-SD" },
            { id: "Galil AR" },
            { id: "SG 553" },
            { id: "AUG" },
            { id: "M249" },
            { id: "Negev" },
            { id: "30", color: "red" } //rouge = attribut
        ],
        links: [
            { source: "Counter-Strike", target: "Weapon", label: "contains" }, //relation simple
            { source: "Riffle", target: "Weapon", label: "ako", color: "#000000" }, //a kind of = relation heritage
            { source: "Sniper", target: "Weapon", label: "ako", color: "#000000" },
            { source: "Shotgun", target: "Weapon", label: "ako", color: "#000000" },
            { source: "SMG", target: "Weapon", label: "ako", color: "#000000" },
            { source: "Pistol", target: "Weapon", label: "ako", color: "#000000" },
            { source: "Famas", target: "Riffle", label: "instance", strokeDasharray: "5" }, //instance = relation d'instance strokeDasharray pour l'affichage
            { source: "Glock-18", target: "Pistol", label: "instance", strokeDasharray: "5" },
            { source: "AK-47", target: "Riffle", label: "instance", strokeDasharray: "5" },
            { source: "M4A1", target: "Riffle", label: "instance", strokeDasharray: "5" },
            { source: "M4A4", target: "Riffle", label: "instance", strokeDasharray: "5" },
            { source: "USP-S", target: "Pistol", label: "instance", strokeDasharray: "5" },
            { source: "Desert Eagle", target: "Pistol", label: "instance", strokeDasharray: "5" },
            { source: "P250", target: "Pistol", label: "instance", strokeDasharray: "5" },
            { source: "Tec-9", target: "Pistol", label: "instance", strokeDasharray: "5" },
            { source: "Five-Seven", target: "Pistol", label: "instance", strokeDasharray: "5" },
            { source: "AWP", target: "Sniper", label: "instance", strokeDasharray: "5" },
            { source: "SSG 08", target: "Sniper", label: "instance", strokeDasharray: "5" },
            { source: "G3SG1", target: "Sniper", label: "instance", strokeDasharray: "5" },
            { source: "SCAR-20", target: "Sniper", label: "instance", strokeDasharray: "5" },
            { source: "MAG-7", target: "Shotgun", label: "instance", strokeDasharray: "5" },
            { source: "Nova", target: "Shotgun", label: "instance", strokeDasharray: "5" },
            { source: "XM1014", target: "Shotgun", label: "instance", strokeDasharray: "5" },
            { source: "Sawed-Off", target: "Shotgun", label: "instance", strokeDasharray: "5" },
            { source: "MP9", target: "SMG", label: "instance", strokeDasharray: "5" },
            { source: "MAC-10", target: "SMG", label: "instance", strokeDasharray: "5" },
            { source: "MP7", target: "SMG", label: "instance", strokeDasharray: "5" },
            { source: "UMP-45", target: "SMG", label: "instance", strokeDasharray: "5" },
            { source: "P90", target: "SMG", label: "instance", strokeDasharray: "5" },
            { source: "PP-Bizon", target: "SMG", label: "instance", strokeDasharray: "5" },
            { source: "MP5-SD", target: "SMG", label: "instance", strokeDasharray: "5" },
            { source: "Galil AR", target: "Riffle", label: "instance", strokeDasharray: "5" },
            { source: "SG 553", target: "Riffle", label: "instance", strokeDasharray: "5" },
            { source: "AUG", target: "Riffle", label: "instance", strokeDasharray: "5" },
            { source: "M249", target: "Riffle", label: "instance", strokeDasharray: "5" },
            { source: "Negev", target: "Riffle", label: "instance", strokeDasharray: "5" },
            { source: "AK-47", target: "30", label: "ammo", color: "red" },
        ],
    });

    const [noeud, setNoeud] = useState("");
    const [attrName, setAttrName] = useState("");
    const [attrVal, setAttrVal] = useState("");

    const [node1, setNode1] = useState("");
    const [node2, setNode2] = useState("");
    const [heritage, setHeritage] = useState(false);
    const [relation, setRelation] = useState("");
    const [ako, setAko] = useState(false);


    const myConfig = {
        nodeHighlightBehavior: true,
        node: {
            color: "lightgreen",
            size: 120,
            highlightStrokeColor: "blue",
        },
        link: {
            highlightColor: "lightblue",
            renderLabel: true
        },
        directed: true,
        d3: {
            gravity: -150,
        },
    };

    const onClickNode = function (nodeId: string) {
        window.alert(`Clicked node ${nodeId}`);
    };

    const onClickLink = function (source: string, target: string) {
        window.alert(`Clicked link between ${source} and ${target}`);
    };

    const addNode = () => {
        let symbol;
        if (type === 'concept') {
            symbol = "square";
        } else {
            symbol = "circle";
        }

        const newNode = {
            id: title, labelProperty: { value: type }, labelPosition: "top", symbolType: symbol
        };
        const newNodes = [...data.nodes, newNode];
        setData({ ...data, nodes: newNodes });
    };

    const addAttributes = () => {
        const newNode = { id: attrVal, color: "red" };
        const newNodes = [...data.nodes, newNode];
        const newLink = { source: noeud, target: newNode.id, label: attrName, color: "red" };
        const newLinks = [...data.links, newLink];
        setData({ nodes: newNodes, links: newLinks });
    };

    const addLinks = () => {

        let newLink;
        if (heritage) {
            newLink = { source: node1, target: node2, label: "instance", strokeDasharray: "5" };
        } else if (ako) {
            newLink = { source: node1, target: node2, label: "ako", color: "#000000" };
        } else {
            newLink = { source: node1, target: node2, label: relation };
        }


        const newLinks = [...data.links, newLink];

        setData({ ...data, links: newLinks });

    };

    const handleTypeChange = (e: any) => {
        setType(e.target.value);
    }

    const handleNoeudChange = (e: any) => {
        setNoeud(e.target.value);
    }

    const handleNode1Change = (e: any) => {
        setNode1(e.target.value);
    }

    const handleNode2Change = (e: any) => {
        setNode2(e.target.value);
    }

    const handleNode1SearchChange = (e: any) => {
        setNode1Search(e.target.value);
    }

    const handleNode2SearchChange = (e: any) => {
        setNode2Search(e.target.value);
    }

    const searchNodes = (query: string) => {
        const keywords = query.trim().toLowerCase().split(" ");
        const result = [];

        for (const node of data.nodes) {
            const nodeValues = Object.values(node).join(" ").toLowerCase();

            if (keywords.every((keyword: string) => nodeValues.includes(keyword))) {
                result.push(node.id);
            }
        }

        for (const link of data.links) {
            const linkValues = Object.values(link).join(" ").toLowerCase();

            if (keywords.every((keyword: string) => linkValues.includes(keyword))) {
                if (!result.includes(link.source)) {
                    result.push(link.source);
                }
                if (!result.includes(link.target)) {
                    result.push(link.target);
                }
            }
        }

        return result;
    };

    console.log(data);

    const calculateDistance = (startNode: string, endNode: string) => {
        const nodes = data.nodes.map((node) => ({ ...node, distance: Infinity, visited: false }));
        const links = data.links;

        const getNodeById = (id: string) => nodes.find((node) => node.id === id);

        const getNeighbors = (nodeId: string) => {
            return links
                .filter((link) => link.source === nodeId || link.target === nodeId)
                .map((link) => {
                    const neighborId = link.source === nodeId ? link.target : link.source;
                    const neighborNode = getNodeById(neighborId);
                    return { node: neighborNode, weight: 1 }; // Assuming all links have a weight of 1
                });
        };

        const calculateShortestPath = (startNode: string, endNode: string) => {
            const queue = [];
            const start = getNodeById(startNode);
            start!.distance = 0;
            queue.push(start);

            while (queue.length > 0) {
                queue.sort((a, b) => a!.distance - b!.distance);
                const currentNode = queue.shift();

                if (currentNode!.id === endNode) {
                    return currentNode!.distance;
                }

                if (currentNode!.visited) {
                    continue;
                }

                currentNode!.visited = true;

                const neighbors = getNeighbors(currentNode!.id);

                for (const neighbor of neighbors) {
                    const { node, weight } = neighbor;
                    const distance = currentNode!.distance + weight;

                    if (distance < node!.distance) {
                        node!.distance = distance;
                        queue.push(node);
                    }
                }
            }

            return Infinity; // No path found
        };

        setDistance(calculateShortestPath(startNode, endNode));
    };

    const findPath = (startNode: string, endNode: string) => {
        const nodes = data.nodes.map((node) => ({
            ...node,
            distance: Infinity,
            visited: false,
            previousNode: null,
        }));
        const links = data.links;

        const getNodeById = (id: string) => nodes.find((node) => node.id === id);

        const getNeighbors = (nodeId: string) => {
            return links
                .filter((link) => link.source === nodeId || link.target === nodeId)
                .map((link) => {
                    const neighborId = link.source === nodeId ? link.target : link.source;
                    const neighborNode = getNodeById(neighborId);
                    return { node: neighborNode, weight: 1 }; // Assuming all links have a weight of 1
                });
        };

        const calculateShortestPath = (startNode: string, endNode: string) => {
            const queue = [];
            const start = getNodeById(startNode);
            start!.distance = 0;
            queue.push(start);

            while (queue.length > 0) {
                queue.sort((a, b) => a!.distance - b!.distance);
                const currentNode = queue.shift();

                if (currentNode!.id === endNode) {
                    const path = [];
                    let current = currentNode;
                    while (current !== null) {
                        path.unshift(current!.id);
                        current = (current!.previousNode as any);
                    }
                    return path;
                }

                if (currentNode!.visited) {
                    continue;
                }

                currentNode!.visited = true;

                const neighbors = getNeighbors(currentNode!.id);

                for (const neighbor of neighbors) {
                    const { node, weight } = neighbor;
                    const distance = currentNode!.distance + weight;

                    if (distance < node!.distance) {
                        node!.distance = distance;
                        node!.previousNode = (currentNode as any);
                        queue.push(node);
                    }
                }
            }

            return []; // No path found
        };

        setPath(calculateShortestPath(startNode, endNode));
    };

    return (
        <Box className="flex flex-col">
            <Box className="flex justify-center">

                <Box sx={{ border: 1, m: 2 }}>
                    <Graph
                        id="graph-id" // id is mandatory
                        data={data}
                        config={myConfig}
                        onClickNode={onClickNode}
                        onClickLink={onClickLink}
                    />
                </Box>

                <Box className="flex flex-col p-2">
                    <TextField fullWidth
                        defaultValue={title}
                        onChange={(e) => {
                            setTitle(e.currentTarget.value);
                        }}
                        placeholder='Nom du noeud'
                        variant='outlined' ></TextField>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Type</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={type}
                            label="Type"
                            onChange={(e) => { handleTypeChange(e) }}
                        >
                            <MenuItem value={"concept"}>Concept</MenuItem>
                            <MenuItem value={"instance"}>Instance</MenuItem>
                        </Select>
                    </FormControl>
                    <Button onClick={() => { addNode() }} variant='contained' color='primary'>Ajouter un noeud</Button>
                </Box>

                <Box className="flex flex-col p-2">
                    <TextField fullWidth
                        defaultValue={attrName}
                        onChange={(e) => {
                            setAttrName(e.currentTarget.value);
                        }}
                        placeholder="Nom de l'attribut"
                        variant='outlined' ></TextField>
                    <TextField fullWidth
                        defaultValue={attrVal}
                        onChange={(e) => {
                            setAttrVal(e.currentTarget.value);
                        }}
                        placeholder="Valeur de l'attribut"
                        variant='outlined' ></TextField>

                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Noeud</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={noeud}
                            label="Noeud"
                            onChange={(e) => { handleNoeudChange(e) }}
                        >
                            {data.nodes.map((node) => {
                                return <MenuItem value={node.id}>{node.id}</MenuItem>
                            })}
                        </Select>
                    </FormControl>
                    <Button onClick={() => { addAttributes() }} variant='contained' color='primary'>Ajouter l'attribut</Button>
                </Box>

                <Box className="flex flex-col p-2">

                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Noeud 1</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={node1}
                            label="Noeud"
                            onChange={(e) => { handleNode1Change(e) }}
                        >
                            {data.nodes.map((node) => {
                                return <MenuItem value={node.id}>{node.id}</MenuItem>
                            })}
                        </Select>
                    </FormControl>



                    <FormControl fullWidth >
                        <InputLabel id="demo-simple-select-label">Noeud 2</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={node2}
                            label="Noeud"
                            onChange={(e) => { handleNode2Change(e) }}
                        >
                            {data.nodes.map((node) => {
                                return <MenuItem value={node.id}>{node.id}</MenuItem>
                            })}
                        </Select>
                    </FormControl>
                    {!ako && <FormControlLabel control={<Checkbox onClick={() => { setHeritage(!heritage) }} />} label="Instance" />}
                    {!heritage && <FormControlLabel control={<Checkbox onClick={() => { setAko(!ako) }} />} label="Ako" />}

                    {!heritage && !ako &&

                        <TextField fullWidth
                            defaultValue={relation}
                            onChange={(e) => {
                                setRelation(e.currentTarget.value);
                            }}
                            placeholder="Nom de la relation"
                            variant='outlined' ></TextField>

                    }

                    <Button onClick={() => { addLinks() }} variant='contained' color='primary'>Creer la relation</Button>




                </Box>

            </Box>
            <Box className="flex justify-center">
                <Box>
                    <Typography variant="h5">Légende</Typography>
                    <Typography variant="h6">Noeud carré = Concept</Typography>
                    <Typography variant="h6">Noeud rond = Instance</Typography>
                    <Typography variant="h6">Noeud et relation rouge = Attribut</Typography>
                    <Typography variant="h6">AKO - A kind of = relation héritage</Typography>
                    <Typography variant="h6">instance = relation d'instanciation</Typography>
                </Box>
                <Box className="flex flex-col p-2">
                    <Typography variant="h6">Recherche</Typography>

                    <TextField fullWidth
                        onChange={(e) => {
                            setSearch(e.currentTarget.value);
                        }}
                        placeholder="Recherche"
                        variant='outlined' ></TextField>

                    {searchNodes(search).map((node) => {
                        return <Typography>{node}</Typography>
                    })}

                </Box>
                <Box>
                    <Typography variant="h6">Distance</Typography>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Noeud 1</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={node1Search}
                            label="Noeud"
                            onChange={(e) => { handleNode1SearchChange(e) }}
                        >
                            {data.nodes.map((node) => {
                                return <MenuItem value={node.id}>{node.id}</MenuItem>
                            })}
                        </Select>
                    </FormControl>



                    <FormControl fullWidth >
                        <InputLabel id="demo-simple-select-label">Noeud 2</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={node2Search}
                            label="Noeud"
                            onChange={(e) => { handleNode2SearchChange(e) }}
                        >
                            {data.nodes.map((node) => {
                                return <MenuItem value={node.id}>{node.id}</MenuItem>
                            })}
                        </Select>
                    </FormControl>

                    <Button onClick={() => { calculateDistance(node1Search, node2Search) }} variant='contained' color='primary'>Calculer la distance</Button>
                    <Button onClick={() => { findPath(node1Search, node2Search) }} variant='contained' color='primary'>Calculer le chemin le plus court</Button>
                    <Typography>Distance : {distance}</Typography>
                    <Typography>Chemin : {path}</Typography>
                </Box>

            </Box>
        </Box>
    )

}