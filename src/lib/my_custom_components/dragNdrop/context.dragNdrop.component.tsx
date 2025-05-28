import {
    closestCenter,
    closestCorners,
    DndContext,
    DragEndEvent,
    PointerSensor,
    TouchSensor,
    useSensor,
    useSensors,
} from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';
import { restrictToParentElement } from '@dnd-kit/modifiers';

interface DragNDropContextProps<T> {
    children: React.ReactNode;
    list: Array<T>;
    setList: React.Dispatch<
        React.SetStateAction<Array<T & { id: string | number }>>
    >;
}

/**
 * A drag-and-drop context component using @dnd-kit/core that manages sorting state.
 * Moves items within the list based on drag end events.
 *
 * @template T - Type of list items, must extend an object with an 'id' of type string or number
 * @param {React.ReactNode} children - The draggable children elements wrapped by this context
 * @param {Array<T>} list - The current list of items to be sorted
 * @param {React.Dispatch<React.SetStateAction<Array<T>>>} setList - State setter function to update the list order
 *
 * @returns {JSX.Element} A DndContext wrapping draggable children with drag sorting logic
 */
export default function DragNDropContext<T extends { id: string | number }>(
    props: DragNDropContextProps<T>
): JSX.Element {
    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;

        if (!over || active.id === over.id) return;

        const oldIndex = props.list.findIndex((item) => item.id === active.id);
        const newIndex = props.list.findIndex((item) => item.id === over.id);

        if (oldIndex === -1 || newIndex === -1) return;

        props.setList((prevList) => arrayMove(prevList, oldIndex, newIndex));
    };

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(TouchSensor)
    );

    return (
        <DndContext
            modifiers={[restrictToParentElement]}
            collisionDetection={closestCorners}
            onDragEnd={handleDragEnd}
            sensors={sensors}
        >
            {props.children}
        </DndContext>
    );
}
