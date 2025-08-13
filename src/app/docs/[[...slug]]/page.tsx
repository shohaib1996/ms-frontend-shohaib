'use client';
import { useState, useEffect, useMemo, useCallback, use } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ArrowLeft, Search, Menu, FileText, Folder, X } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import dayjs from 'dayjs';
import Image from 'next/image';
import instance from '@/lib/axios';
import DocumentPageLoader from '@/components/doc/DocumentPageLoader';
import TreeView from '@/components/doc/TreeView';
import DocViewer from '@/components/doc/DocViewer';
import GlobalComment from '@/components/global/comments/global-comment';

interface Doc {
    _id: string;
    title: string;
    description: string;
    slug: string;

    updatedAt: string;
    createdBy?: {
        fullName: string | null;
        profilePicture?: string;
        role: string;
    };
}

interface TreeNode {
    _id: string;
    title: string;
    type: 'folder' | 'page';
    parent: string | null;
    children?: TreeNode[];
    slug?: string;
}

interface Staff {
    user: {
        _id: string;
        fullName: string;
        profilePicture?: string;
    };
}

interface SearchResult {
    _id: string;
    title: string;
    type: 'folder' | 'page';
    slug?: string;
    path: string[];
}

// Remove async from the function signature and handle params differently
export default function DocumentPage({
    params,
}: {
    params: Promise<{ slug?: string[] }>;
}) {
    const resolvedParams = use(params);
    const pathName = usePathname();
    const router = useRouter();
    const [query, setQuery] = useState('');
    const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
    const [showSearchResults, setShowSearchResults] = useState(false);
    const [doc, setDoc] = useState<Doc | null>(null);
    const [docLoading, setDocLoading] = useState(false);
    const [isAsideVisible, setAsideVisible] = useState(true);
    const [isMobile, setIsMobile] = useState(false);
    const [treeData, setTreeData] = useState<TreeNode[]>([]);
    const [loading, setLoading] = useState(true);
    const [isEmpty, setIsEmpty] = useState(true);

    // Function to fetch specific document
    const fetchDocument = async (slug: string) => {
        setDocLoading(true);
        try {
            const res = await instance.get(`/docs/page/${slug}`);
            setDoc(res.data?.doc || null);
        } catch (error) {
            console.error('Error fetching document:', error);
            setDoc(null);
        } finally {
            setDocLoading(false);
        }
    };

    // Add these search functions
    const flattenTreeData = (
        nodes: TreeNode[],
        path: string[] = [],
    ): SearchResult[] => {
        const results: SearchResult[] = [];

        nodes.forEach((node) => {
            const currentPath = [...path, node.title];
            results.push({
                _id: node._id,
                title: node.title,
                type: node.type,
                slug: node.slug,
                path: currentPath,
            });

            if (node.children && node.children.length > 0) {
                results.push(...flattenTreeData(node.children, currentPath));
            }
        });

        return results;
    };

    const performSearch = useCallback(() => {
        if (!query.trim()) {
            setSearchResults([]);
            setShowSearchResults(false);
            return;
        }

        const flattenedData = flattenTreeData(treeData);
        const searchTerm = query.toLowerCase().trim();

        const results = flattenedData.filter((item) => {
            const titleMatch = item.title.toLowerCase().includes(searchTerm);
            const pathMatch = item.path.some((pathItem) =>
                pathItem.toLowerCase().includes(searchTerm),
            );
            return titleMatch || pathMatch;
        });

        // Sort results: exact matches first, then partial matches
        results.sort((a, b) => {
            const aExactMatch = a.title.toLowerCase() === searchTerm;
            const bExactMatch = b.title.toLowerCase() === searchTerm;

            if (aExactMatch && !bExactMatch) {
                return -1;
            }
            if (!aExactMatch && bExactMatch) {
                return 1;
            }

            const aStartsWithMatch = a.title
                .toLowerCase()
                .startsWith(searchTerm);
            const bStartsWithMatch = b.title
                .toLowerCase()
                .startsWith(searchTerm);

            if (aStartsWithMatch && !bStartsWithMatch) {
                return -1;
            }
            if (!aStartsWithMatch && bStartsWithMatch) {
                return 1;
            }

            return a.title.localeCompare(b.title);
        });

        setSearchResults(results);
        setShowSearchResults(true);
    }, [query, treeData]);

    const handleSearchResultSelect = (result: SearchResult) => {
        if (result.type === 'page' && result.slug) {
            router.push(`/docs/${result.slug}`);
            setQuery('');
            setShowSearchResults(false);
        }
    };

    const clearSearch = () => {
        setQuery('');
        setSearchResults([]);
        setShowSearchResults(false);
    };

    // Add this useEffect for search debouncing
    useEffect(() => {
        const debounceTimer = setTimeout(() => {
            performSearch();
        }, 300);

        return () => clearTimeout(debounceTimer);
    }, [performSearch]);

    // Handle document selection and navigation
    const handleNodeSelect = (node: TreeNode) => {
        if (node?.type === 'page' && node.slug) {
            router.push(`/docs/${node.slug}`);
        }
    };

    const handleFetchData = async () => {
        setLoading(true);
        try {
            const res = await instance.get(`/docs/frontend`);
            setTreeData(res.data?.docs || []);
            setIsEmpty(!res.data?.docs?.length);
        } catch (err) {
            console.error(err);
            setTreeData([]);
            setIsEmpty(true);
        } finally {
            setLoading(false);
        }
    };

    // Effect to fetch tree data on mount
    useEffect(() => {
        handleFetchData();
    }, []);

    // Effect to fetch document when slug changes
    useEffect(() => {
        if (resolvedParams.slug && resolvedParams.slug.length > 0) {
            const lastSlug =
                resolvedParams.slug[resolvedParams.slug.length - 1];
            fetchDocument(lastSlug);
        } else {
            setDoc(null);
        }
    }, [resolvedParams.slug]);

    // Effect for responsive behavior
    useEffect(() => {
        const handleResize = () => {
            const mobile = window.innerWidth < 860;
            setIsMobile(mobile);
            if (mobile) {
                setAsideVisible(false);
            } else {
                setAsideVisible(true);
            }
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Close aside when document changes on mobile
    useEffect(() => {
        if (isMobile) {
            setAsideVisible(false);
        }
    }, [doc, isMobile]);

    const filteredTreeData = useMemo(() => {
        if (!query.trim()) {
            return treeData;
        }

        return treeData.filter((node) => {
            const searchTerm = query.toLowerCase();

            if (node.title.toLowerCase().includes(searchTerm)) {
                return true;
            }

            const hasMatchingChild = node.children?.some((child) =>
                child.title.toLowerCase().includes(searchTerm),
            );

            return hasMatchingChild;
        });
    }, [query, treeData]);

    if (loading) {
        return (
            <div className='flex justify-center items-center h-full w-full py-12 px-4 md:px-6 lg:px-8 my-container mt-[40px]'>
                <DocumentPageLoader />
            </div>
        );
    }

    if (isEmpty && !loading) {
        return (
            <div className='flex items-center justify-center h-screen'>
                <div className='text-center'>
                    <p className='text-gray'>No data found</p>
                </div>
            </div>
        );
    }

    const isDocsHome = pathName === '/docs';

    return (
        <Card className='bg-transparent shadow-none border-none py-12 px-4 md:px-6 lg:px-8 my-container mt-[40px]'>
            <div className='py-2 border-b border-forground-border'>
                <div className='flex justify-between items-start'>
                    <div className='left'>
                        <h2 className='title flex items-center gap-2 text-2xl font-bold mb-2'>
                            <ArrowLeft
                                className='h-6 w-6 cursor-pointer'
                                onClick={() => router.push('/dashboard')}
                            />
                            User Manual
                        </h2>
                        <p className='subTitle text-gray'>
                            From here you can see all instructions to use the
                            SkillBNK App.
                        </p>
                    </div>
                    <div className='right'>
                        <div className='data space-y-0'>
                            {doc?.createdBy && (
                                <p className='flex items-center gap-2'>
                                    <strong>Last Updated By:</strong>
                                    <div className='flex items-center gap-2'>
                                        <Avatar className='h-10 w-10'>
                                            <AvatarImage
                                                src={
                                                    doc?.createdBy
                                                        ? doc?.createdBy
                                                              ?.profilePicture
                                                        : '/avatar.jpg'
                                                }
                                            />
                                            <AvatarFallback>
                                                {doc?.createdBy &&
                                                doc?.createdBy.fullName
                                                    ? doc.createdBy.fullName.slice(
                                                          0,
                                                      )
                                                    : 'S'}
                                            </AvatarFallback>
                                        </Avatar>
                                        <span>
                                            {doc?.createdBy
                                                ? doc?.createdBy?.fullName
                                                : 'Shiblu Ahmed'}
                                        </span>
                                        <span className='text-gray'>
                                            {doc?.createdBy?.role
                                                ? doc?.createdBy?.role
                                                : 'Admin'}
                                        </span>
                                    </div>
                                </p>
                            )}
                            {doc?.updatedAt && (
                                <p className='flex items-center gap-2'>
                                    <strong>Last Updated:</strong>
                                    <span className='text-gray'>
                                        {dayjs(
                                            doc?.updatedAt || new Date(),
                                        ).format('MMM DD, YYYY')}{' '}
                                        at{' '}
                                        {dayjs(
                                            doc?.updatedAt || new Date(),
                                        ).format('hh:mm A')}
                                    </span>
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <div className='p-0 pt-2'>
                <div className='mb-4 relative'>
                    <div className='flex items-center gap-2'>
                        <div className='relative flex-1'>
                            <div className='relative'>
                                <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400' />
                                <Input
                                    onChange={(e) => setQuery(e.target.value)}
                                    value={query}
                                    placeholder='Search documents, folders, and content...'
                                    className='w-full pl-10 pr-10 bg-foreground border border-forground-border'
                                />
                                {query && (
                                    <Button
                                        variant='ghost'
                                        size='sm'
                                        className='absolute right-1 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0'
                                        onClick={clearSearch}
                                    >
                                        <X className='h-4 w-4' />
                                    </Button>
                                )}
                            </div>
                        </div>
                        <Button
                            variant='default'
                            className='flex items-center gap-2'
                            onClick={performSearch}
                        >
                            <Search className='h-4 w-4' />
                            Search
                        </Button>
                    </div>

                    {/* Search Results Dropdown */}
                    {showSearchResults && (
                        <div className='absolute top-full left-0 right-0 mt-1 bg-foreground border border-forground-border rounded-lg shadow-lg max-h-80 overflow-y-auto z-50'>
                            {searchResults.length > 0 ? (
                                <>
                                    <div className='p-2 border-b border-forground-border'>
                                        <p className='text-sm text-gray'>
                                            {searchResults.length} result
                                            {searchResults.length !== 1
                                                ? 's'
                                                : ''}{' '}
                                            found
                                        </p>
                                    </div>
                                    <div className='py-1'>
                                        {searchResults.map((result) => (
                                            <div
                                                key={result._id}
                                                className='flex items-center gap-3 px-3 py-2 hover:bg-background cursor-pointer transition-colors'
                                                onClick={() =>
                                                    handleSearchResultSelect(
                                                        result,
                                                    )
                                                }
                                            >
                                                <div className='flex-shrink-0'>
                                                    {result.type ===
                                                    'folder' ? (
                                                        <Folder className='h-4 w-4 text-yellow-500' />
                                                    ) : (
                                                        <FileText className='h-4 w-4 text-primary' />
                                                    )}
                                                </div>
                                                <div className='flex-1 min-w-0'>
                                                    <p className='text-sm font-medium text-dark-gray truncate'>
                                                        {result.title}
                                                    </p>
                                                    <p className='text-xs text-gray truncate'>
                                                        {result.path.join(
                                                            ' > ',
                                                        )}
                                                    </p>
                                                </div>
                                                <div className='flex-shrink-0'>
                                                    <span
                                                        className={`text-xs px-2 py-1 ${result.type === 'folder' ? 'bg-yellow-500/20 text-yellow-600' : 'bg-primary-light text-primary'} rounded-full`}
                                                    >
                                                        {result.type}
                                                    </span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </>
                            ) : (
                                <div className='p-4 text-center'>
                                    <p className='text-sm text-gray'>{`No results found for "${query}"`}</p>
                                    <p className='text-xs text-gray mt-1'>
                                        Try different keywords or check spelling
                                    </p>
                                </div>
                            )}
                        </div>
                    )}
                </div>

                <div className='flex flex-col items-start gap-4'>
                    {!isMobile && (
                        <div className='flex gap-2 w-full max-h-[calc(100vh-200px)]'>
                            <aside className='min-h-full max-h-full overflow-y-auto w-[315px] bg-foreground rounded-lg'>
                                <TreeView
                                    data={filteredTreeData}
                                    onNodeSelect={handleNodeSelect}
                                />
                            </aside>

                            <div className='bg-foreground min-h-full max-h-full overflow-y-auto rounded-lg flex-1'>
                                {docLoading ? (
                                    <div className='flex justify-center items-center py-8'>
                                        <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900'></div>
                                    </div>
                                ) : isDocsHome ? (
                                    <div className='flex flex-col justify-center h-full items-center w-full'>
                                        <Image
                                            src={'/documentation.png'}
                                            alt='Documentation Image'
                                            className='w-[250px] h-[250px] mx-auto'
                                            width={4176}
                                            height={4176}
                                        />
                                        <h2 className='text-3xl font-bold'>
                                            Welcome to Docs
                                        </h2>
                                    </div>
                                ) : doc ? (
                                    <div>
                                        <DocViewer doc={doc} />
                                        <div className='mt-4 px-4 pt-4 border-t border-forground-border'>
                                            <GlobalComment
                                                // bgColor='background'
                                                contentId={doc?._id}
                                            />
                                        </div>
                                    </div>
                                ) : (
                                    <div className='text-center py-8'>
                                        <p className='text-gray'>
                                            No document found
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {isMobile && (
                        <>
                            {!isAsideVisible && (
                                <Menu
                                    className='cursor-pointer text-2xl'
                                    onClick={() => setAsideVisible(true)}
                                />
                            )}

                            {isAsideVisible && (
                                <aside className='docs_root min-h-[90vh] w-full'>
                                    <TreeView
                                        data={filteredTreeData}
                                        onNodeSelect={(node) => {
                                            handleNodeSelect(node);
                                            setAsideVisible(false);
                                        }}
                                    />
                                </aside>
                            )}

                            {!isAsideVisible && (
                                <div className='w-full'>
                                    {docLoading ? (
                                        <div className='flex justify-center items-center py-8'>
                                            <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900'></div>
                                        </div>
                                    ) : isDocsHome ? (
                                        <h2 className='text-center my-5 text-2xl font-bold'>
                                            Welcome to Docs
                                        </h2>
                                    ) : doc ? (
                                        <div>
                                            <DocViewer doc={doc} />
                                            <div className='mt-4 bg-foreground'>
                                                <GlobalComment
                                                    // bgColor='foreground'
                                                    contentId={doc?._id}
                                                />
                                            </div>
                                        </div>
                                    ) : (
                                        <div className='text-center py-8'>
                                            <p className='text-gray'>
                                                No document found
                                            </p>
                                        </div>
                                    )}
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>
        </Card>
    );
}
