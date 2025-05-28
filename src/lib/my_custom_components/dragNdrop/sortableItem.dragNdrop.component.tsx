import {} from '@dnd-kit/core';
import { SyntheticListenerMap } from '@dnd-kit/core/dist/hooks/utilities';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import clsx from 'clsx';

interface SortableItemDnDProps {
    children: React.ReactNode;
    id: string;
    moveDirection?: 'x' | 'y' | 'both';
    sortableHandle?: React.ReactNode;
    marginY?: 'sm' | 'md' | 'lg' | 'none';
    marginX?: 'sm' | 'md' | 'lg' | 'none';
    paddingY?: 'sm' | 'md' | 'lg' | 'none';
    paddingX?: 'sm' | 'md' | 'lg' | 'none';
    bg?: string;
    borderColor?: string;
    boxShadow?: string;
}

/**
 * SortableItemDnD is a draggable item component that integrates with @dnd-kit/sortable.
 * It supports restricted drag movement directions and optional drag handles.
 *
 * @param {string} id - Unique identifier for the sortable item, required by dnd-kit
 * @param {'x' | 'y' | 'both'} moveDirection - Allowed drag axis: 'x', 'y', or 'both'
 * @param {React.ReactNode} sortableHandle - Optional handle element to restrict dragging to this area
 * @param {'sm' | 'md' | 'lg' | 'none'} paddingY - Padding size on the y-axis (default: py-2)
 * @param {'sm' | 'md' | 'lg' | 'none'} paddingX - Padding size on the x-axis (default: px-2)
 * @param {string} marginY - Margin size on the y-axis (default: py-0)
 * @param {string} marginX - Margin size on the x-axis (default: px-0)
 * @param {string} bg - Tailwind-compatible background color (e.g., "white", "gray-100")
 * @param {string} borderColor - Optional border color (e.g., 'border-gray-300'). If provided, a border will be applied.
 * @param {string}boxShadow - Optional Tailwind boxShadow (e.g., 'shadow-sm'). If provided, a boxShadow will be applied.
 * @param {React.ReactNode} children - The content of the sortable item
 *
 * @returns {React.JSX.Element} A draggable sortable item element
 */
export default function SortableItemDnD({
    id,
    moveDirection = 'both',
    sortableHandle,
    marginY = 'sm',
    marginX = 'sm',
    paddingY = 'sm',
    paddingX = 'sm',
    bg = 'bg-transparent',
    borderColor = 'border-transparent',
    boxShadow = 'shadow-none',
    children,
}: SortableItemDnDProps): React.JSX.Element {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id: id });

    const style = {
        transition,
        transform: CSS.Transform.toString({
            scaleX: transform?.scaleX ?? 1,
            scaleY: transform?.scaleY ?? 1,
            x:
                moveDirection === 'x' || moveDirection === 'both'
                    ? transform?.x ?? 0
                    : 0,
            y:
                moveDirection === 'y' || moveDirection === 'both'
                    ? transform?.y ?? 0
                    : 0,
        }),
        zIndex: isDragging ? 999 : 'auto',
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...(!sortableHandle ? listeners : {})}
            className={clsx(
                'flex flex-nowrap gap-2 w-full rounded-md touch-none',
                paddingY === 'sm' // padding Y
                    ? 'py-1'
                    : paddingY === 'md'
                    ? 'py-2'
                    : paddingY === 'lg'
                    ? 'py-3'
                    : paddingY === 'none'
                    ? 'py-0'
                    : 'py-2',
                paddingX === 'sm' // Padding X
                    ? 'px-1'
                    : paddingX === 'md'
                    ? 'px-2'
                    : paddingX === 'lg'
                    ? 'px-3'
                    : paddingX === 'none'
                    ? 'px-0'
                    : 'px-2',
                marginY === 'sm' // Margin Y
                    ? 'my-1'
                    : marginY === 'md'
                    ? 'my-2'
                    : marginY === 'lg'
                    ? 'my-3'
                    : marginY === 'none'
                    ? 'my-0'
                    : 'my-0',
                marginX === 'sm' // Margin X
                    ? 'mx-1'
                    : marginX === 'md'
                    ? 'mx-2'
                    : marginX === 'lg'
                    ? 'mx-3'
                    : marginX === 'none'
                    ? 'mx-0'
                    : 'mx-0',
                `${bg}`,
                clsx('border', borderColor, `focus:${borderColor}`),
                boxShadow && boxShadow,
                sortableHandle
                    ? 'cursor-default'
                    : 'cursor-grab active:cursor-grabbing'
            )}
        >
            {sortableHandle && (
                <SortableItemHandle listeners={listeners}>
                    {sortableHandle}
                </SortableItemHandle>
            )}
            {children}
        </div>
    );
}

interface SortableItemHandleProps {
    listeners: SyntheticListenerMap | undefined;
    children: React.ReactNode;
}

/**
 * A wrapper component that applies drag event listeners to the sortable handle element.
 *
 * @param {SyntheticListenerMap | undefined} listeners - Event listeners to enable drag interactions
 * @param {React.ReactNode} children - The handle element(s) that initiate dragging
 *
 * @returns {React.JSX.Element} A div wrapping the handle with drag listeners attached
 */
function SortableItemHandle(props: SortableItemHandleProps): React.JSX.Element {
    return (
        <div
            className="cursor-grab active:cursor-grabbing flex items-center"
            {...props.listeners}
        >
            {props.children}
        </div>
    );
}
