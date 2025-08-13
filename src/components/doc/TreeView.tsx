'use client';

import type React from 'react';
import { useEffect, useState } from 'react';
import TreeNode from './TreeNode';

interface TreeNodeData {
    _id: string;
    title: string;
    type: 'folder' | 'page';
    parent: string | null;
    children?: TreeNodeData[];
    slug?: string;
}

interface TreeViewProps {
    data: TreeNodeData[];
    onNodeSelect: (node: TreeNodeData) => void;
}

const TreeView: React.FC<TreeViewProps> = ({ data, onNodeSelect }) => {
    const [activeNodeId, setActiveNodeId] = useState<string | null>(null);
    const [expandedNodes, setExpandedNodes] = useState<Record<string, boolean>>(
        {},
    );
    const [isClient, setIsClient] = useState(false);

    // Handle client-side hydration
    useEffect(() => {
        setIsClient(true);
    }, []);

    useEffect(() => {
        if (!isClient) {
            return;
        }

        const savedActiveNode = localStorage.getItem('activeNode');
        const savedExpandedNodes = localStorage.getItem('expandedNodes');

        if (savedActiveNode) {
            setActiveNodeId(savedActiveNode);
        }
        if (savedExpandedNodes) {
            try {
                setExpandedNodes(JSON.parse(savedExpandedNodes));
            } catch (error) {
                console.error('Error parsing saved expanded nodes:', error);
            }
        } else if (data.length > 0) {
            expandFirstParentAndSetFirstChildPage(data);
        }
    }, [data, isClient]);

    const findFirstPageInNode = (node: TreeNodeData): TreeNodeData | null => {
        if (node.type === 'page') {
            return node;
        }
        if (node.children) {
            for (const child of node.children) {
                const foundPage = findFirstPageInNode(child);
                if (foundPage) {
                    return foundPage;
                }
            }
        }
        return null;
    };

    const expandFirstParentAndSetFirstChildPage = (nodes: TreeNodeData[]) => {
        const firstParent = nodes.find(
            (node) =>
                node.parent === null &&
                node.children &&
                node.children.length > 0,
        );

        if (firstParent) {
            const firstChildPage = findFirstPageInNode(firstParent);

            if (firstChildPage) {
                setActiveNodeId(firstChildPage._id);
                if (isClient) {
                    localStorage.setItem('activeNode', firstChildPage._id);
                }

                const newExpandedNodes: Record<string, boolean> = {};

                // Create a map for quick lookups
                const nodeMap = new Map<string, TreeNodeData>();
                const addToMap = (nodeList: TreeNodeData[]) => {
                    nodeList.forEach((node) => {
                        nodeMap.set(node._id, node);
                        if (node.children) {
                            addToMap(node.children);
                        }
                    });
                };
                addToMap(nodes);

                // Expand parent chain
                let currentNode: TreeNodeData | null = firstChildPage;
                while (currentNode && currentNode.parent) {
                    newExpandedNodes[currentNode.parent] = true;
                    currentNode = nodeMap.get(currentNode.parent) || null;
                }

                newExpandedNodes[firstParent._id] = true;

                setExpandedNodes(newExpandedNodes);
                if (isClient) {
                    localStorage.setItem(
                        'expandedNodes',
                        JSON.stringify(newExpandedNodes),
                    );
                }

                if (onNodeSelect) {
                    onNodeSelect(firstChildPage);
                }
            }
        }
    };

    const handleNodeClick = (node: TreeNodeData) => {
        setActiveNodeId(node._id);
        if (isClient) {
            localStorage.setItem('activeNode', node._id);
        }

        if (node.type === 'folder') {
            const newExpandedNodes = { ...expandedNodes };

            if (node.parent === null) {
                // Handle root level folders
                data.forEach((rootNode) => {
                    if (rootNode._id === node._id) {
                        newExpandedNodes[rootNode._id] =
                            !expandedNodes[rootNode._id];
                    } else if (rootNode.parent === null) {
                        newExpandedNodes[rootNode._id] = false;
                    }
                });
            } else {
                // Handle nested folders
                newExpandedNodes[node._id] = !expandedNodes[node._id];
            }

            setExpandedNodes(newExpandedNodes);
            if (isClient) {
                localStorage.setItem(
                    'expandedNodes',
                    JSON.stringify(newExpandedNodes),
                );
            }

            // Auto-select first child page when expanding
            if (newExpandedNodes[node._id] && node.children) {
                const firstChildPage = findFirstPageInNode(node);
                if (firstChildPage) {
                    setActiveNodeId(firstChildPage._id);
                    if (isClient) {
                        localStorage.setItem('activeNode', firstChildPage._id);
                    }

                    if (onNodeSelect) {
                        onNodeSelect(firstChildPage);
                    }
                    return; // Don't call onNodeSelect again below
                }
            }
        }

        if (onNodeSelect) {
            onNodeSelect(node);
        }
    };

    // Don't render until client-side hydration is complete to avoid mismatch
    if (!isClient) {
        return (
            <ul className='treeView_sideBar space-y-1'>
                {data?.map((node) => (
                    <div
                        key={node._id}
                        className='h-8 bg-background animate-pulse rounded'
                    ></div>
                ))}
            </ul>
        );
    }

    return (
        <ul className='treeView_sideBar space-y-1'>
            {data?.map((node) => (
                <TreeNode
                    key={node._id}
                    node={node}
                    activeNodeId={activeNodeId}
                    expandedNodes={expandedNodes}
                    onNodeClick={handleNodeClick}
                />
            ))}
        </ul>
    );
};

export default TreeView;
