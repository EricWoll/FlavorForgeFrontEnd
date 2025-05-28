import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Button } from '@/lib/my_custom_components/buttons/button.component';
import Input from '@/lib/my_custom_components/inputs/input.Form.component';

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
                <Button.Hover isOutlined>Add</Button.Hover>
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
                            size="full"
                            paddingX="none"
                            paddingY="sm"
                            borderColor="border-tinted_gray_500"
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
                            size="full"
                            paddingX="none"
                            paddingY="sm"
                            borderColor="border-tinted_gray_500"
                        />
                    </div>
                </div>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button.Hover
                            onClick={props.dialogCloseOnClick}
                            isOutlined
                        >
                            Add Amount
                        </Button.Hover>
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
                <Button.Hover isOutlined>Add</Button.Hover>
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
                    <Input
                        id="name"
                        isTextArea
                        value={props.directionValue}
                        placeholder="Whisk eggs and Parmesan together."
                        onChange={props.directionOnChange}
                        size="full"
                        paddingX="none"
                        paddingY="sm"
                        borderColor="border-tinted_gray_500"
                        resize="y"
                    />
                </div>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button.Hover
                            onClick={props.dialogCloseOnClick}
                            isOutlined
                        >
                            Add Direction
                        </Button.Hover>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
