import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

interface IngredientsDialogProps {
    nameValue: string;
    nameOnChange: React.ChangeEventHandler<
        HTMLInputElement | HTMLTextAreaElement
    >;
    amountValue: string;
    amountOnChange: React.ChangeEventHandler<
        HTMLInputElement | HTMLTextAreaElement
    >;
    dialogCloseOnClick: React.MouseEventHandler<HTMLButtonElement> | undefined;
}

export function IngredientsDialog(props: IngredientsDialogProps) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant={'outline'}>Add</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="select-none cursor-default">
                        Add Ingredient
                    </DialogTitle>
                </DialogHeader>
                <div className="flex flex-col gap-4 py-4 w-full">
                    <div className="grid items-center gap-2 w-full">
                        <Label
                            htmlFor="name"
                            className="text-right w-fit select-none cursor-default"
                        >
                            Name:
                        </Label>
                        <Input
                            id="name"
                            value={props.nameValue}
                            placeholder="sugar"
                            onChange={props.nameOnChange}
                        />
                    </div>
                    <div className="grid items-center gap-2 w-full">
                        <Label
                            htmlFor="amount"
                            className="text-right w-fit select-none cursor-default"
                        >
                            Amount:
                        </Label>
                        <Input
                            id="amount"
                            value={props.amountValue}
                            placeholder="1/2 tsb"
                            onChange={props.amountOnChange}
                        />
                    </div>
                </div>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button
                            variant={'outline'}
                            onClick={props.dialogCloseOnClick}
                        >
                            Add Amount
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

interface DirectonsDialogProps {
    directionValue: string;
    directionOnChange: React.ChangeEventHandler<
        HTMLInputElement | HTMLTextAreaElement
    >;
    dialogCloseOnClick: React.MouseEventHandler<HTMLButtonElement> | undefined;
}

export function DirectionsDialog(props: DirectonsDialogProps) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant={'outline'}>Add</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="select-none cursor-default">
                        Add Direction
                    </DialogTitle>
                </DialogHeader>
                <div className="grid items-center gap-2 w-full">
                    <Label
                        htmlFor="name"
                        className="text-right w-fit select-none cursor-default"
                    >
                        Direction:
                    </Label>
                    <Textarea
                        id="name"
                        value={props.directionValue}
                        placeholder="Whisk eggs and Parmesan together."
                        onChange={props.directionOnChange}
                    />
                </div>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button
                            onClick={props.dialogCloseOnClick}
                            variant={'outline'}
                        >
                            Add Direction
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
