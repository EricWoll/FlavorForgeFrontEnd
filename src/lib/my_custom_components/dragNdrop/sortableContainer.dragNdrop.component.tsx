import {
    horizontalListSortingStrategy,
    SortableContext,
    verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import clsx from 'clsx';

interface SortableDnDContainerProps<T extends { id: string | number }> {
    listDirection?: 'vertical' | 'horizontal';
    children: React.ReactNode;
    id: string;
    itemsList: Array<T>;
}

/**
 * Provides a sortable context for a list of draggable items using @dnd-kit/sortable.
 * Supports horizontal and vertical sorting strategies.
 *
 * @template T - Type of list items, must extend an object with an 'id' of type string or number
 * @param {'vertical' | 'horizontal'} [listDirection='vertical'] - Direction of the sortable list
 * @param {React.ReactNode} children - The sortable items/components rendered inside this context
 * @param {string} id - Unique identifier for the sortable context
 * @param {Array<T>} itemsList - Array of item IDs representing the sortable order
 *
 * @returns {JSX.Element} A SortableContext wrapper for sortable children
 */
export default function SortableDnDContainer<T extends { id: string | number }>(
    props: SortableDnDContainerProps<T>
) {
    const sortDirection =
        props.listDirection == 'horizontal'
            ? horizontalListSortingStrategy
            : props.listDirection == 'vertical'
            ? verticalListSortingStrategy
            : verticalListSortingStrategy;

    return (
        <SortableContext
            id={props.id}
            items={props.itemsList}
            strategy={sortDirection}
        >
            <div
                className={clsx(
                    'flex',
                    props.listDirection == 'horizontal'
                        ? 'flex-row'
                        : props.listDirection == 'vertical'
                        ? 'flex-col'
                        : 'flex-col'
                )}
            >
                {props.children}
            </div>
        </SortableContext>
    );
}
