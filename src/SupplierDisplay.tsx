import { SupplierEditor } from "./SupplierEditor";
import { SupplierTable } from "./SupplierTable";
import { Supplier } from './types';
import { useSelector, useDispatch } from "react-redux";
import { RootState, addSupplier, updateSupplier, deleteSupplier, startEditing, stopEditing } from "./store";

interface SupplierDisplayProps {
  name?: string;
}

export const SupplierDisplay: React.FC<SupplierDisplayProps> = ({ name }) => {
  const suppliers = useSelector((state: RootState) => state.model.suppliers);
  const editing = useSelector((state: RootState) => state.model.editing);
  const editingId = useSelector((state: RootState) => state.model.editingId);
  const dispatch = useDispatch();

  console.log("Rendering SupplierDisplay...");
  console.log("Current editing state:", editing);
  console.log("Current editingId:", editingId);
  console.log("Suppliers state:", suppliers);

  const handleStartEditing = (supplier: Supplier): void => {
    console.log("Edit button clicked for supplier:", supplier);
    if (supplier.id !== undefined) {
      dispatch(startEditing({ type: "suppliers", id: supplier.id }));
    }
  };

  const handleCreateSupplier = (): void => {
    console.log("Create button clicked");
    dispatch(startEditing({ type: "suppliers", id: -1 }));
  };

  const handleCancelEditing = (): void => {
    console.log("Cancel button clicked");
    dispatch(stopEditing());
  };

  const handleSaveSupplier = (supplier: Supplier): void => {
    console.log("Saving supplier:", supplier);
    if (supplier.id === -1) {
      dispatch(addSupplier(supplier));
    } else {
      dispatch(updateSupplier(supplier));
    }
    console.log("Dispatching stopEditing");
    dispatch(stopEditing());
  };

  const handleDeleteSupplier = (supplier: Supplier): void => {
    console.log("Delete button clicked for supplier:", supplier);
    if (supplier.id !== undefined) {
      dispatch(deleteSupplier(supplier.id));
    }
  };

  const selectedSupplier: Supplier = editingId !== null
    ? suppliers.find(s => s.id === editingId) || { id: -1, name: "", city: "", products: [] }
    : { id: -1, name: "", city: "", products: [] };

  if (editing === "suppliers") {
    return (
      <SupplierEditor
        key={Math.random()}  // 強制リレンダリング用
        supplier={selectedSupplier}
        saveCallback={handleSaveSupplier}
        cancelCallback={handleCancelEditing}
      />
    );
  }

  return (
    <div className="m-2">
      <SupplierTable
        suppliers={suppliers}
        editCallback={handleStartEditing}
        deleteCallback={handleDeleteSupplier}
      />
      <div className="text-center">
        <button className="btn btn-primary m-1" onClick={handleCreateSupplier}>
          Create Supplier
        </button>
      </div>
    </div>
  );
};
