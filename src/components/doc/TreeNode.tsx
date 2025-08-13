'use client';

import type React from 'react';

import {
    Folder,
    FolderOpen,
    FileText,
    ChevronDown,
    ChevronRight,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface TreeNodeData {
    _id: string;
    title: string;
    type: 'folder' | 'page';
    parent: string | null;
    children?: TreeNodeData[];
    slug?: string;
}

interface TreeNodeProps {
    node: TreeNodeData;
    activeNodeId: string | null;
    expandedNodes: Record<string, boolean>;
    onNodeClick: (node: TreeNodeData) => void;
    depth?: number;
}

const TreeNode: React.FC<TreeNodeProps> = ({
    node,
    activeNodeId,
    expandedNodes,
    onNodeClick,
    depth = -1,
}) => {
    const isActive = node._id === activeNodeId;

    const isChildActive = (node: TreeNodeData): boolean => {
        if (node.children && node.children.length > 0) {
            return node.children.some(
                (child) => child._id === activeNodeId || isChildActive(child),
            );
        }
        return false;
    };

    const parentActive = isActive || isChildActive(node);
    const isExpanded = expandedNodes[node._id];

    const handleClick = (e: React.MouseEvent) => {
        e.preventDefault();
        onNodeClick(node);
    };

    const activeBorderOffset = -12.5 - depth * 9.5;

    return (
        <li
            className={cn(
                'relative list-none',
                node?.parent === null && 'node_view_first_parent',
                'node_view_root',
            )}
        >
            <span
                onClick={handleClick}
                className={cn(
                    `flex items-center gap-2 cursor-pointer py-2 px-3 hover:bg-primary-light border-l border-transparent hover:border-primary transition-colors relative ${isActive && node?.parent !== null && 'bg-primary-light border-l-2 border-primary'}`,
                    parentActive && 'font-medium text-black',
                    node?.parent === null && 'first_title',
                    node?.parent !== null && 'child_title',
                    node?.parent === null && isExpanded && 'first_title_border',
                )}
            >
                {node.type === 'folder' ? (
                    isExpanded ? (
                        <FolderOpen className='h-4 w-4 text-yellow-500' />
                    ) : (
                        <Folder className='h-4 w-4 text-yellow-500' />
                    )
                ) : (
                    <FileText className='h-4 w-4 text-blue-500' />
                )}

                <span className='flex-1'>{node.title}</span>

                {node.type === 'folder' && (
                    <span className='ml-auto'>
                        {isExpanded ? (
                            <ChevronDown className='h-4 w-4 text-dark-gray' />
                        ) : (
                            <ChevronRight className='h-4 w-4 text-dark-gray' />
                        )}
                    </span>
                )}

                {/* {isActive && node?.parent !== null && (
                    <div
                        style={{ left: `${activeBorderOffset}px`, top: '8px' }}
                        className='absolute w-1 h-6 bg-primary rounded-r active_border'
                    />
                )} */}
            </span>

            {isExpanded && node.children && (
                <ul className='ml-4 mt-1 space-y-1'>
                    {node.children.map((child) => (
                        <TreeNode
                            key={child._id}
                            node={child}
                            activeNodeId={activeNodeId}
                            expandedNodes={expandedNodes}
                            onNodeClick={onNodeClick}
                            depth={depth + 1}
                        />
                    ))}
                </ul>
            )}
        </li>
    );
};

export default TreeNode;
